# MicroMind

AI-powered thought journal on Linera microchains.
Every user owns their mind. Every thought lives on their chain.

## What is MicroMind?

Users write a thought, Claude AI analyzes its emotional tone, and the result is stored on their personal microchain.

**One user = one chain = full ownership.**

## Stack

- Linera SDK (Rust/Wasm) - microchain smart contract
- Claude API - mood and sentiment analysis
- React + Vite + TypeScript - frontend
- Vercel - hosting + API proxy

## Contract Operations

- AddEntry(thought, mood, score) - store AI analysis result
- ClearHistory - wipe your own chain

## GraphQL Queries

- entries - full history
- latestMood - most recent entry
- moodStats - aggregate sentiment

## Built for Linera Buildathon 2025

> Every thought deserves its own chain.

Author: @ArtemGromov777
