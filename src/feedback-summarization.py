import pandas as pd
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import spacy

nlp = spacy.load('en_core_web_sm')
# Sample DataFrame
data = {'topic': ['Topic A', 'Topic A', 'Topic B', 'Topic B'],
        'feedback': ['I like the product, but it could be improved', 
                     'The product is great and the customer service is excellent',
                     'The product quality is poor',
                     'The customer service needs improvement']}

df = pd.DataFrame(data)

# Tokenization and stop words removal
stop_words = set(stopwords.words('english'))
def tokenize(text):
    words = word_tokenize(text.lower())
    return [word for word in words if word.isalnum() and word not in stop_words]

# Sentiment analysis
sia = SentimentIntensityAnalyzer()
def get_sentiment(text):
    score = sia.polarity_scores(text)
    if score['compound'] >= 0.2:
        return 'positive'
    elif score['compound'] <= -0.2:
        return 'negative'
    else:
        return 'neutral'


df['sentiment'] = df['feedback'].apply(get_sentiment)

# Topic modeling
vectorizer = CountVectorizer(tokenizer=tokenize)
X = vectorizer.fit_transform(df['feedback'])

lda = LatentDirichletAllocation(n_components=2, random_state=42)
lda.fit(X)

def get_topic(text):
    text_vectorized = vectorizer.transform([text])
    topic_id = lda.transform(text_vectorized).argmax()
    return f"Topic {topic_id + 1}"

df['topic'] = df['feedback'].apply(get_topic)

# Pros and cons extraction
def extract_pros_cons(text, sentiment):
    doc = nlp(text)
    pros = []
    cons = []
    
    # Iterate over the tokens in the document
    for token in doc:
        if token.dep_ == 'advcl' and token.head.text.lower() == 'but':
            # If the token is part of a subordinate clause starting with "but"
            cons.append(token.head.text.lower())
        elif token.dep_ == 'conj' and token.head.text.lower() == 'but':
            # If the token is part of a conjunction with "but"
            cons.append(token.text.lower())
        elif token.dep_ == 'advcl' and sentiment == 'negative':
            # If the token is part of a subordinate clause and sentiment is negative
            cons.append(token.head.text.lower())
        elif token.dep_ == 'advcl' and sentiment == 'positive':
            # If the token is part of a subordinate clause and sentiment is positive
            pros.append(token.head.text.lower())
        elif token.dep_ == 'conj' and sentiment == 'positive':
            # If the token is part of a conjunction and sentiment is positive
            pros.append(token.text.lower())

    return ', '.join(pros), ', '.join(cons)

#df['pros'], df['cons'] = zip(*df['feedback'].apply(extract_pros_cons))
df['pros'], df['cons'] = zip(*df.apply(lambda x: extract_pros_cons(x['feedback'], x['sentiment']), axis=1))

# Consolidated summarization
def summarize_feedback(topic_df):
    topic = topic_df['topic'].iloc[0]
    pros = topic_df['pros'].tolist()
    cons = topic_df['cons'].tolist()
    sentiment = topic_df['sentiment'].tolist()
    
    # Combine pros and cons into a single summary
    pros_summary = 'Pros: ' + ', '.join(pros) if pros else ''
    cons_summary = 'Cons: ' + ', '.join(cons) if cons else ''
    
    # Count sentiments
    sentiment_count = pd.Series(sentiment).value_counts()
    sentiment_summary = f"Sentiment: Positive={sentiment_count.get('positive', 0)}, Negative={sentiment_count.get('negative', 0)}, Neutral={sentiment_count.get('neutral', 0)}"
    
    return f"Topic: {topic}, {pros_summary}, {cons_summary}, {sentiment_summary}"

topic_summaries = df.groupby('topic').apply(summarize_feedback)

# Consolidated summarization (selecting top summaries)
top_topic_summaries = topic_summaries.head(2)  # Selecting top 2 summaries

top_topic_summaries.to_excel("summary.xlsx")
print(top_topic_summaries)
