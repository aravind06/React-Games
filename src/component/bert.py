from sentence_transformers import SentenceTransformer, util

# Load a pre-trained BERT-based model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

def semantic_similarity_bert(sentence, paragraph):
    # Encode the sentence and paragraph
    sentence_embedding = model.encode(sentence, convert_to_tensor=True)
    paragraph_embedding = model.encode(paragraph, convert_to_tensor=True)

    # Calculate cosine similarity between the embeddings
    similarity_score = util.pytorch_cos_sim(sentence_embedding, paragraph_embedding).item()

    return similarity_score

# Example
sentence_to_compare = "The quick brown fox"
paragraph_to_compare = "A fast brown fox jumped over the lazy dog in the backyard."

similarity_score_bert = semantic_similarity_bert(sentence_to_compare, paragraph_to_compare)
print(f"Semantic Similarity Score (BERT): {similarity_score_bert}")
