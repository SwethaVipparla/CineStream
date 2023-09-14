# ADR 3: Kafka as message broker

## Status

Proposed

## Context

The CineStream OTT platform needs to decouple different services and components that have different workloads and requirements. It also needs to ensure reliable and fault-tolerant communication between them. Some of the services and components are:

- User service: handles user authentication, authorization, preferences and profiles
- Content service: handles content metadata, catalog, recommendations and ratings
- Streaming service: handles video streaming, transcoding, encryption and delivery
- Billing service: handles subscription plans, payments and invoices
- Analytics service: handles data collection, processing and visualization

## Decision

We will use Kafka as the message broker for enabling asynchronous and reliable communication between different services and components of the OTT platform. Kafka is a distributed streaming platform that allows us to:

- Publish and consume messages from different topics that represent different events or actions
- Handle high-throughput and low-latency communication with durability and scalability
- Use partitions, replication, offsets and consumer groups to balance the load and ensure fault-tolerance
- Use connectors, streams, schemas and other features to integrate with various data sources and destinations

## Consequences

Using Kafka as the message broker has the following consequences:

- We can decouple different services and components that have different workloads and requirements
- We can communicate reliably and asynchronously between them using messages
- We can handle large volumes of data with high performance and availability
- We can enable real-time data processing and analytics for the OTT platform
- We have to deal with some challenges such as:
  - Message ordering, which means we have to ensure the messages are processed in the correct order
  - Message duplication, which means we have to avoid processing the same message more than once
  - Message loss, which means we have to ensure the messages are not lost or corrupted during transmission


We decided to use Kafka as the message broker for enabling asynchronous and reliable communication between different services and components of our OTT platform because it provides us with decoupling, performance, fault-tolerance and real-time analytics. However, we also have to deal with some trade-offs such as message ordering, message duplication and message loss.