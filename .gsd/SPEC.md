# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision

**Just Us** (Us2gether) is a private digital universe for couples to deepen their connection. It serves as a shared space for intimate communication, memory keeping, and real-time presence, fostering a sense of togetherness even when apart.

## Goals

1.  **Deep Communication**: Enable thoughtful, non-instant communication through "Letters".
2.  **Shared History**: Create a collaborative timeline of memories (photos + text) with flashback capabilities.
3.  **Emotional Connection**: Facilitate shared experiences through music playlists and "now playing" status.
4.  **Real-time Presence**: Maintain connection through home screen widgets that update with partner activity.

## Non-Goals (Out of Scope)

- **Synchronized Music Playback**: We will not attempt perfect millisecond-level audio synchronization between devices.
- **Social Networking**: No public profiles, likes, or feeds. Strictly private between two partners.
- **Dating/Matching**: The app assumes the couple is already together; no discovery features.

## Users

- **Couples**: Partners in a committed relationship looking for a private, dedicated digital space.

## Constraints

- **Platform**: iOS and Android (via Expo/React Native).
- **Widgets**: Implementation via `expo-widgets` (or native modules where necessary).
- **Music Integration**: Dependent on available APIs (Spotify/Apple Music) for "status" and "playlists", not raw audio streaming.

## Success Criteria

- [ ] Couples can successfully connect and pair accounts.
- [ ] Users can send/receive Letters (instant & scheduled).
- [ ] Users can upload memories and view them on a timeline.
- [ ] Users can see what their partner is listening to.
- [ ] Home screen widgets update with partner's latest photo/status.
