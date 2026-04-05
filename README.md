# MicroMind

> AI-powered thought journal on Linera microchains.
> Every user owns their mind. Every thought lives on their chain.



![Linera](https://img.shields.io/badge/Linera-Buildathon-6366f1?style=for-the-badge)




![Rust](https://img.shields.io/badge/Rust-Wasm-f74c00?style=for-the-badge&logo=rust)




![React](https://img.shields.io/badge/React-TypeScript-61dafb?style=for-the-badge&logo=react)




![Claude](https://img.shields.io/badge/Claude-AI-cc785c?style=for-the-badge)



## Live Demo

https://micromind-sand.vercel.app

## What is MicroMind?

Users write a thought, Claude AI analyzes its emotional tone and intent,
and the result is permanently stored on their personal Linera microchain.

One user = one chain = full ownership.

## How it works

1. User writes a thought
2. Claude API analyzes mood and sentiment score (-100 to +100)
3. Result stored on user microchain via GraphQL mutation
4. History queryable from user chain only

## Stack

- Linera SDK (Rust/Wasm) - microchain smart contract
- Claude API - mood and sentiment analysis
- React + Vite + TypeScript - frontend
- Vercel - hosting and API proxy

## Contract Operations

- AddEntry(thought, mood, score) - store AI analysis result
- ClearHistory - wipe your own chain

## GraphQL Queries

- entries - full history
- latestMood - most recent entry
- moodStats - aggregate sentiment over time

## Quick Start

    cd contracts
    cargo build --release --target wasm32-unknown-unknown

    linera wallet init --faucet https://faucet.testnet-conway.linera.net
    linera wallet request-chain --faucet https://faucet.testnet-conway.linera.net
    linera publish-and-create target/wasm32-unknown-unknown/release/micromind_contract.wasm target/wasm32-unknown-unknown/release/micromind_service.wasm --json-argument '"[]"'

    cd frontend
    cp .env.example .env
    npm install
    npm run dev

## Built for Linera Buildathon 2025

Every thought deserves its own chain.

Author: @ArtemGromov777
Twitter: https://twitter.com/ArtemGromov777
Telegram: https://t.me/Artem00777
