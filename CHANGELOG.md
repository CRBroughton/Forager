# Forager

## 2.1.0

### Minor Changes

- 2f5dabb: Users can now create landmarks - Users are now able to create landmarks. This feature
  re-purposes the arbitrary item menu to allow users to 
  add landmarks to the map. Landmarks, like items, can also be deleted.
- a021252: move calendar month component to images menu - Previously, all added items of interest could not have
  their calendar months customised. You can now customise
  items 'startMonth' and 'endMonth' months, the months
  you can expect to find this item in the wild. Any existing
  items you have will need to be manually edited.
 
### Patch Changes

- 68ed2d7: Include Docker deployment options - Forager can now be deployed with a Docker image
- bb3202a: Create loading screen on application login
- ad34d82: Add migration for default services, canCreateAccounts now defaults to true
- c03d753: Create user and item seeder

## 2.0.0

### Major Changes

- Move environment settings to user account - Users will
  now have to provide thier own Mapbox API keys on account creation (this is a breaking change). - Users will now have to ensure the appropriate
  Pocketbase server URL is set on first launch to
  properly communicate with the server.
