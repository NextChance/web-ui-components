# CONTRIBUTING

This file sets the code workflow and how to contribute to the project.

## ISSUES

### When creating issues:
- The **title** should be **explanatory** and make clear the **scope of the task**
  - Any collaborator should be able to know the scope by reading the title
  - If you find some task with a vague title fix it!
- Must have one of this **labels**:
  - `feature`
  - `bug`
  - `refactor`
- Include any **valuable info inside the task description** to help QA or other collaborator work on those tasks.
  - Write the description of the task as if it were to be done by someone with whom you can not communicate by other way
- Should be inside a **milestone**
  - If the issue is not going to be in the actual or 2 next milestones mind if it could be created in the future better than now. Mind that during the time you arrive to include that issue in the milestone, all the info could be deprecated.

### Working with issues:
- Ensure that the issue is included in your milestone (if not make sure that you can work on it during this milestone or take another issue)
- Always assign the issue to yourself whenever you start to work with it
- Add the label `doing` while you still developing on it.
- Update the issue info when needed:
  - If during the development of the task come up more relevant info write it in the task by comments, same as any doubts.
  - Dont remove info, use the crossed format (`~~Removed text~~`)

### Closing Issues / Finishing Issue Development:
- Only QA collaborator can close tasks
- Remove `doing` label
- Add `done` label
- If QA needs to test the issue on your `feature`/`bugfix`/`refactor` branch:
  - Add the `to test` label
  - Unassign yourself from the issue
  - Assign the issue to some QA collaborator
- If the code can be move directly to `qa` branch without a pretesting or have been pretested:
  - Follow the DEPLOYS rules until the issue is in `qa` and then:
    - Add the `to test` label
    - Unassign yourself from the issue
    - Assign the issue to some QA collaborator

_**Note:** More info about when you can move the code directly to QA on DEPLOYS and PULL REQUESTS sections._

## BRANCHES

Follow the next conventions for branches:
- All **new branches must be created from `dev`** (ensure is up to date)
  - Except **`hotfix` branches must be created from `master`**
- All branches should be **prefixed with**:
  - `feature/` for new developments or added funcionality
  - `bugfix/` for bug fixing and error solving.
  - `refactor/` for improves on code and refactoring.
  - `hotfix/` same as `bugfix` but when it needs to be fixed in `master`
- The branch name should be as much self explanatory as it could be
  - Use hyphenated phrases with max 5 words
  - Include the related issues at the beggining of the name when possible
  - Examples:
    - `feature/123-login`
    - `bugfix/23-44-login`
    - `refactor/231-app-controllers`
    - `hotfix/login-error`
- Remember to remove the branch from the server once it has been merged to some of the deployement branches `dev`/`qa`/`master`.
  - Mind if you want to keep the branch in local in case you need to do a rollback of the code (this should never happen).

## PULL REQUESTS (PR)

There are different kind of PRs.

### Development PRs

- Created to pass code to `dev` branch.
- Origin must be `feature`/`refactor`/`bugfix` branch.
- PR description should have a CHANGELOG section with the changes to be included into the branch
- Assign at least **2 reviewers** (developers).
- Mantain up to date with `dev` branch (if you find a PR outdated, update it).
- **Only Merge if**:
  - You have **no requested changes pending** and at least **one approval**.
  - **QA has test it** in the individual branch.
  - **QA don't need to test it individually**.

### Deploy PRs

- Created to pass code to `dev`, `qa` or `master`
- Origin must be always an environment branch (`dev`/`qa`/`master`)
- They can only be:
  - `dev` -> `qa`
    - Created:
      - Whenever `dev` has commits ahead `qa`
      - Must include a **changelog in the description** with the related issues
      - Must be called "**QA Update**"
    - Update:
      - Whenever a PR "DEV update" has been merged
      - Ensure CHANGELOG file is correct
    - Merged:
      - Need QA to run tests in `qa`
  - `qa` -> `master`
    - Created:
      - Whenever `qa` has commits ahead `master`
      - Must include a **changelog in the description** with the related issues
      - Must be called "**PROD Update**"
    - Updated:
      - Whenever a PR "QA Update" has been merged
      - Update changelog in description with the merged "QA Update" changelog
    - Merged:
      - QA collaborator has passed the test and approved the PR
      - A release has been closed in `qa` branch (git tag and changelog update)
  - `master` -> `dev`
    - Created:
      - Whenever `master` has commits ahead `dev`
      - After every release
      - After every hotfix
      - Must be called "**DEV Update**"
    - Updated:
      - Because this ones should be merged always it shouldnt be necessary to update its info
    - Merged:
      - Always

### Hotfix PRs

- Created to pass code to `master`
- Origin must be always a `bugfix/` branch
- PR description should have a CHANGELOG section with the changes it is introducing to the branch
- Use the same merge policy as for Development PRs

_**Note:** Read the DEPLOYS section for better understanding of the code flow._

## DEPLOYS

There are 3 environments with their related branches:
- development -> `dev`
- QA -> `qa`
- production -> `master`

The code flows in loop starting from `dev` to `qa` to `master` and then to `dev` again starting the loop again.
- `dev` -> `qa` -> `master` -> `dev` -> `qa` ...

Outside of this loop are the `feature`/`bugfix`/`refactor`/`hotfix` branches that are created from one point in the loop and inject code inside the same loop point:
- `dev` -> `feature`/`bugfix`/`refactor` -> `dev`
- `master` -> `hotfix` -> `master`

### Deploy tagging

After the PR to merge to the master branch has been accepted, this version must be tagged in order to save a snapshot of this version.

- In most of cases, tags will be provided everytime a deploy is made from QA to master or a Hotfix to master is needed.
- The tag must be performed in the branch performing the change.
- In order to do so, once in the branch holding the change, go to your terminal-console and run `npm version major/minor/patch` (depending on the version change that you have, choose the right one). See semver.org for more info about versioning.
- After that, type `git push` to push any changes left to push in your branch and then execute `git push --tags` to push your new tag.


As contributor of this project you must ensure that the code flow is being followed and fix or report any issue you can detect regarding the deployement flow.