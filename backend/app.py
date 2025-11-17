# # backend/app.py
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from qdrant_client import QdrantClient
# from qdrant_client.http.models import Distance, VectorParams, PointStruct
# from sentence_transformers import SentenceTransformer
# import uuid

# app = FastAPI()

# # Allow React Native to talk to backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Qdrant: In-memory (no Docker, no file)
# client = QdrantClient(":memory:")
# embedder = SentenceTransformer('all-MiniLM-L6-v2')

# COLLECTION = "transit_memory_db"
# if not client.collection_exists(COLLECTION):
#     client.create_collection(
#         collection_name=COLLECTION,
#         vectors_config=VectorParams(size=384, distance=Distance.COSINE),
#     )

# class Preference(BaseModel):
#     userId: str
#     key: str
#     value: str

# @app.post("/store-preference")
# async def store(pref: Preference):
#     text = f"User's {pref.key}: {pref.value}"
#     vector = embedder.encode(text).tolist()
#     point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{pref.userId}_{pref.key}"))
    
#     client.upsert(
#         collection_name=COLLECTION,
#         points=[PointStruct(
#             id=point_id,
#             vector=vector,
#             payload={
#                 "type": "USER_PREF",
#                 "user_id": pref.userId,
#                 pref.key: pref.value
#             }
#         )]
#     )
#     return {"status": "saved"}

# @app.get("/get-prefs/{user_id}")
# async def get_prefs(user_id: str):
#     # Mock semantic search
#     query = "user preferences crowd seating anxiety wait time"
#     vector = embedder.encode(query).tolist()
#     results = client.search(
#         collection_name=COLLECTION,
#         query_vector=vector,
#         query_filter={"must": [{"key": "user_id", "match": {"value": user_id}}]},
#         limit=10
#     )
#     prefs = {}
#     for hit in results:
#         payload = hit.payload
#         for k, v in payload.items():
#             if k not in ["type", "user_id"]:
#                 prefs[k] = v
#     return prefs

# print("Qdrant backend ready! Run: uvicorn app:app --reload")

# backend/app.py
# # backend/app.py
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from qdrant_client import QdrantClient
# from qdrant_client.http.models import Distance, VectorParams, PointStruct
# from sentence_transformers import SentenceTransformer
# import uuid

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Qdrant in-memory
# client = QdrantClient(":memory:")
# embedder = SentenceTransformer('all-MiniLM-L6-v2')

# COLLECTION = "transit_memory_db"
# if not client.collection_exists(COLLECTION):
#     client.create_collection(
#         collection_name=COLLECTION,
#         vectors_config=VectorParams(size=384, distance=Distance.COSINE),
#     )

# class Preference(BaseModel):
#     userId: str
#     key: str
#     value: str

# @app.get("/store-preference")
# async def store_get():
#     return {"error": "Use POST to save data"}

# @app.post("/store-preference")
# async def store(pref: Preference):
#     text = f"User's {pref.key}: {pref.value}"
#     vector = embedder.encode(text).tolist()
#     point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{pref.userId}_{pref.key}"))
    
#     client.upsert(
#         collection_name=COLLECTION,
#         points=[PointStruct(
#             id=point_id,
#             vector=vector,
#             payload={
#                 "type": "USER_PREF",
#                 "user_id": pref.userId,
#                 pref.key: pref.value
#             }
#         )]
#     )
#     return {"status": "saved"}

# @app.get("/get-prefs/{user_id}")
# async def get_prefs(user_id: str):
#     query = "user preferences crowd seating anxiety wait time"
#     vector = embedder.encode(query).tolist()
#     results = client.search(collection_name=COLLECTION, query_vector=vector, limit=10)
#     prefs = {}
#     for hit in results:
#         p = hit.payload
#         if p.get("user_id") == user_id and p.get("type") == "USER_PREF":
#             for k, v in p.items():
#                 if k not in ["type", "user_id"]:
#                     prefs[k] = v
#     return prefs

# @app.post("/process-query")
# async def process_query(data: dict):
#     query = data.get("query", "").lower()
#     needs_vision = any(word in query for word in ["bus", "platform", "crowd", "seat", "smell"])
#     return {"needsVision": needs_vision}

# @app.post("/fusion")
# async def fusion(data: dict):
#     user_id = data.get("userId")
#     query = data.get("query", "")
#     image_data = data.get("image", "")  # <-- This is the Base64 image string

#     # --- 🔍 CHECK DATA ARRIVAL HERE ---
#     print("\n--- INCOMING FUSION DATA ---")
#     print(f"User ID: {user_id}")
#     print(f"Query: {query}")
    
#     # Check if the image data is present and its size
#     if image_data:
#         print(f"Image Data Size: {len(image_data)} characters")
#         print(f"Image Data Starts With: {image_data[:30]}...") 
#     else:
#         print("Image Data: MISSING")
#     print("--------------------------\n")
#     # -----------------------------------

#     prefs = await get_prefs(user_id)
#     user_id = data.get("userId")
#     query = data.get("query", "")
#     image = data.get("image", "")

#     prefs = await get_prefs(user_id)
#     vision_result = "Bus 101 is here. Crowd: medium. Seat: front available."

#     instruction = f"{vision_result} "
#     if prefs.get("crowdTolerance", "10") < "5":
#         instruction += "Avoid front due to crowd anxiety. "
#     if prefs.get("seatingPreference") == "rear":
#         instruction += "Go to rear for safety. "

#     return {"instruction": instruction.strip()}

# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct, ScrollRequest
from sentence_transformers import SentenceTransformer
import uuid
from datetime import datetime # 👈 NEW: Required for logging query timestamps

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Qdrant in-memory setup
client = QdrantClient(":memory:")
embedder = SentenceTransformer('all-MiniLM-L6-v2')

COLLECTION = "transit_memory_db"
if not client.collection_exists(COLLECTION):
    client.create_collection(
        collection_name=COLLECTION,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE),
    )

# --- DATA MODELS ---
class Preference(BaseModel):
    userId: str
    key: str
    value: str

class UserQuery(BaseModel): # 👈 NEW: Model for logging voice queries
    userId: str
    query: str
# --------------------

# --- PREFERENCE ENDPOINTS ---

@app.get("/store-preference")
async def store_get():
    return {"error": "Use POST to save data"}

@app.post("/store-preference")
async def store(pref: Preference):
    text = f"User's {pref.key}: {pref.value}"
    vector = embedder.encode(text).tolist()
    point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{pref.userId}_{pref.key}"))
    
    client.upsert(
        collection_name=COLLECTION,
        points=[PointStruct(
            id=point_id,
            vector=vector,
            payload={
                "type": "USER_PREF",
                "user_id": pref.userId,
                pref.key: pref.value
            }
        )]
    )
    return {"status": "preference saved"}

@app.get("/get-prefs/{user_id}")
async def get_prefs(user_id: str):
    query = "user preferences crowd seating anxiety wait time"
    vector = embedder.encode(query).tolist()
    results = client.search(collection_name=COLLECTION, query_vector=vector, limit=10)
    prefs = {}
    for hit in results:
        p = hit.payload
        if p.get("user_id") == user_id and p.get("type") == "USER_PREF":
            # Extract the actual preference key/value pair
            for k, v in p.items():
                if k not in ["type", "user_id"]:
                    prefs[k] = v
    return prefs

# --- QUERY LOGGING ENDPOINT (NEW) ---

@app.post("/store-query")
async def store_query_endpoint(uq: UserQuery):
    """Stores the user's raw voice query into Qdrant for history/context."""
    text = f"User asked: {uq.query}"
    vector = embedder.encode(text).tolist()
    # Use a time-based UUID for unique IDs for each query
    point_id = str(uuid.uuid1())
    
    client.upsert(
        collection_name=COLLECTION,
        points=[PointStruct(
            id=point_id,
            vector=vector,
            payload={
                "type": "USER_QUERY",
                "user_id": uq.userId,
                "query_text": uq.query,
                "timestamp": str(datetime.now())
            }
        )]
    )
    return {"status": "query logged"}

# --- DATABASE INSPECTION ENDPOINT (NEW) ---

@app.get("/inspect-db")
async def inspect_db():
    """Fetches all points from the collection for debugging."""
    
    all_points = []
    # Use scroll to efficiently iterate over all points
    scroll_result = client.scroll(
        collection_name=COLLECTION,
        limit=50, 
        with_payload=True,
        with_vectors=False
    )
    records = scroll_result[0]
    next_offset = scroll_result[1]

    # Function to process records from one scroll
    def process_records(recs):
        for record in recs:
            all_points.append({
                "id": record.id,
                "payload": record.payload
            })

    process_records(records)

    # Loop through remaining pages
    while next_offset is not None:
        scroll_result = client.scroll(
            collection_name=COLLECTION,
            limit=50,
            with_payload=True,
            with_vectors=False,
            offset=next_offset
        )
        records = scroll_result[0]
        next_offset = scroll_result[1]
        process_records(records)

    return {"collection": COLLECTION, "total_records": len(all_points), "records": all_points}


# --- MAIN PIPELINE ENDPOINTS ---

@app.post("/process-query")
async def process_query(data: dict):
    query = data.get("query", "").lower()
    needs_vision = any(word in query for word in ["bus", "platform", "crowd", "seat", "smell"])
    return {"needsVision": needs_vision}

@app.post("/fusion")
async def fusion(data: dict):
    user_id = data.get("userId")
    query = data.get("query", "")
    image_data = data.get("image", "")

    # 🚨 STEP 1: LOG THE USER QUERY
    # Store the query text as part of the user's history
    await store_query_endpoint(UserQuery(userId=user_id, query=query))

    # --- 🔍 CHECK DATA ARRIVAL HERE ---
    print("\n--- INCOMING FUSION DATA ---")
    print(f"User ID: {user_id}")
    print(f"Query: {query}")
    if image_data:
        print(f"Image Data Size: {len(image_data)} characters")
        print(f"Image Data Starts With: {image_data[:30]}...") 
    else:
        print("Image Data: MISSING")
    print("--------------------------\n")
    # -----------------------------------

    # STEP 2: GET PREFERENCES
    prefs = await get_prefs(user_id)
    
    # STEP 3: MOCK VISION AND FUSION LOGIC (Replace with Gemini/LLM calls later)
    vision_result = "Bus 101 is here. Crowd: medium. Seat: front available."

    instruction = f"{vision_result} "
    if prefs.get("crowdTolerance") == "low": # Assuming "low" is the stored value for < 5 tolerance
        instruction += "Avoid front due to crowd anxiety. "
    if prefs.get("seatingPreference") == "rear":
        instruction += "Go to rear for safety. "

    return {"instruction": instruction.strip()}

@app.get("/get-user-summary/{user_id}")
async def get_user_summary(user_id: str):
    """
    Fetches the user's current preferences and their last few queries.
    """
    # 1. Fetch current preferences (using existing function)
    preferences = await get_prefs(user_id)
    
    # 2. Fetch last 5 queries
    queries = []
    
    # We use scroll with filtering (filter = payload.type == "USER_QUERY")
    scroll_result = client.scroll(
        collection_name=COLLECTION,
        limit=5, # Limit to the last 5 queries
        with_payload=True,
        with_vectors=False,
        # Filter: Only points where 'type' is 'USER_QUERY' and 'user_id' matches
        # Note: Qdrant filtering uses JSON-like structure
        scroll_filter={
            "must": [
                {"key": "type", "match": {"value": "USER_QUERY"}},
                {"key": "user_id", "match": {"value": user_id}},
            ]
        }
    )
    
    # The scroll result is sorted by creation time (uuid1), so the first 5 are the latest
    records = scroll_result[0]
    
    for record in records:
        # Extract the query text and timestamp
        queries.append({
            "query": record.payload.get("query_text"),
            "time": record.payload.get("timestamp").split('.')[0] # Clean up the timestamp
        })

    return {
        "userId": user_id,
        "preferences": preferences,
        "recentQueries": queries
    }