import spacy

nlp = spacy.load("en_core_web_md")

def spacy_similarity_score(sentence1, sentence2):
    doc1 = nlp(sentence1)
    doc2 = nlp(sentence2)
    similarity_score = doc1.similarity(doc2)
    return similarity_score

sentence1 = "The quick brown fox jumps over the lazy dog."
sentence2 = "A fast brown fox leaps over a lazy canine."

similarity_score = spacy_similarity_score(sentence1, sentence2)
print(f"SpaCy Similarity Score: {similarity_score}")
