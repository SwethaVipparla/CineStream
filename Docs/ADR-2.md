# ADR 2: Use MongoDB as the primary database for storing user and movie data

## Status

Approved

## Context

The platform needs to store large amounts of user and movie data that are heterogeneous, dynamic and unstructured. It also needs to support fast and flexible queries and updates on the data.

## Decision

We will use MongoDB as the primary database for storing user and movie data. MongoDB is a document-oriented database that stores data as JSON documents. It allows us to:

- Model user and movie data as schemaless documents that can vary in structure and content
- Perform fast and flexible queries and updates on the data using MongoDB query language
- Scale horizontally by distributing the data across multiple servers using sharding and replication
- Use indexes, aggregation pipelines, text search, geospatial queries and other features to optimize the performance and functionality of the database

## Consequences

Using MongoDB as the primary database has the following consequences:

- We can store user and movie data as JSON documents that can accommodate different types and formats of data
- We can query and update the data using MongoDB query language, which is expressive and powerful
- We can scale the database easily by adding more servers and partitions as the data grows
- We have to deal with some challenges such as:
  - Lack of ACID transactions, which means we have to ensure data consistency and integrity at the application level
  - Schema evolution, which means we have to manage changes in the document structure over time
  - Data modeling, which means we have to design the documents and collections carefully to avoid duplication, fragmentation and performance issues



We decided to use MongoDB as the primary database for storing user and movie data because it provides us with flexibility, scalability and performance. However, we also have to deal with some trade-offs such as data consistency, schema evolution and data modeling.

