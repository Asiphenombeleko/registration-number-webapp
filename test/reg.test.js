import express from 'express'
import pgPromise from 'pg-promise';
import database from './db/databaseLogic.js'

const connectionString = process.env.DATABASE_URL || "postgresql://codex:xcode123@localhost:5432/projectdb";

const db = pgPromise()(connectionString);