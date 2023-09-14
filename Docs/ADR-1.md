# ADR 1: Microservices Architecture Pattern

## Status: 
Approved

## Context:
- The platform needs to handle different types of workloads from different OTT providers and users. 
- It also needs to be scalable, reliable and adaptable to changing requirements and technologies.

## Decision: 

- To use a microservices architecture pattern for developing and deploying the platform. 
- The microservices architecture pattern is an architectural style that structures an application as a collection of loosely coupled services that implement business capabilities. 
- Each service is responsible for a single function or domain and has its own data, logic, and interface. 
- The services communicate with each other through well-defined APIs and protocols. 
- The services can be developed using different technologies and languages, and can be deployed independently on different platforms or environments. 
- The microservices architecture pattern enables the platform to achieve high cohesion, low coupling, and high modularity.

## Consequences: 

- The microservices architecture pattern allows the platform to decompose into smaller and independent services that can be developed, deployed and scaled independently. 
- It also enables faster delivery, easier testing and better fault isolation. 
- However, it also introduces challenges such as increased complexity, network latency and inter-service communication.

The platform uses a microservices architecture pattern to handle different types of workloads from different OTT providers and users in a scalable, reliable and adaptable way.