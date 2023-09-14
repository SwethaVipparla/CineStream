# ADR 4: Using OAuth 2.0 framework for authentication and authorization

## Status

Proposed

## Context

The platform needs to ensure the user’s privacy and security and prevent unauthorized access to the movie content. It also needs to integrate with different OTT providers’ APIs without storing their credentials.

## Decision

We will use OAuth 2.0 framework for authenticating and authorizing users and OTT providers. OAuth 2.0 is a standard protocol that allows us to:

- Delegate the authentication and authorization process to a trusted third-party service, such as Google or Facebook
- Obtain access tokens from different OTT providers’ APIs without storing their credentials
- Use different grant types, such as authorization code, implicit, client credentials and resource owner password credentials, depending on the use case and the level of trust
- Use scopes, refresh tokens, revocation and introspection to manage the access tokens and their permissions

## Consequences

Using OAuth 2.0 framework for authenticating and authorizing users and OTT providers has the following consequences:

- We can ensure the user’s privacy and security and prevent unauthorized access to the movie content
- We can integrate with different OTT providers’ APIs without storing their credentials
- We can use different grant types and scopes to suit different scenarios and requirements
- We have to deal with some challenges such as:
  - Complexity, which means we have to understand and implement the OAuth 2.0 protocol correctly and securely
  - Vulnerability, which means we have to protect the access tokens and the communication channels from attacks such as phishing, interception and replay
  - Dependency on third-party services, which means we have to rely on their availability, performance and compatibility

## Summary

We proposed to use OAuth 2.0 framework for authenticating and authorizing users and OTT providers because it provides us with privacy, security and integration. However, if we go ahead and implement this then we need to deal with some trade-offs such as complexity, vulnerability and dependency on third-party services.