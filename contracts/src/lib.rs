use async_graphql::{Request, Response, SimpleObject};
use linera_sdk::base::ContractAbi;
use serde::{Deserialize, Serialize};

pub struct MicroMindAbi;

impl ContractAbi for MicroMindAbi {
    type Operation = Operation;
    type Response = ();
}

impl linera_sdk::base::ServiceAbi for MicroMindAbi {
    type Query = Request;
    type QueryResponse = Response;
}

#[derive(Debug, Serialize, Deserialize, Clone, SimpleObject)]
pub struct MoodEntry {
    pub thought: String,
    pub mood: String,
    pub score: i8,
    pub timestamp: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum Operation {
    AddEntry { thought: String, mood: String, score: i8, timestamp: u64 },
    ClearHistory,
}
