declare module '~build/time' {
  const time: Date;

  export = time;
}

declare module '~build/git' {
  /** Github repo url */
  export const github: string | null;

  /** The current branch */
  export const branch: string;

  /** SHA of the current commit */
  export const sha: string;

  /** The first 10 chars of the current SHA */
  export const abbreviatedSha: string;

  /** The tag for the current SHA (or `null` if no tag exists) */
  export const tag: string | null;

  /** The tags for the current SHA */
  export const tags: string[] | null;

  /** Tag for the closest tagged ancestor (or `null` if no ancestor is tagged) */
  export const lastTag: string | null;

  /** The committer of the current SHA */
  export const committer: string;

  /** The committer email of the current SHA */
  export const committerEmail: string;

  /** The commit date of the current SHA */
  export const committerDate: string;

  /** The author for the current SHA */
  export const author: string;

  /** The author email for the current SHA */
  export const authorEmail: string;

  /** The authored date for the current SHA */
  export const authorDate: string;

  /** The commit message for the current SHA */
  export const commitMessage: string;
}

declare module '~build/ci' {
  /**
   * Returns a boolean. Will be `true` if the code is running on a CI server,
   * otherwise `false`.
   *
   * Some CI servers not listed here might still trigger the `ci.isCI`
   * boolean to be set to `true` if they use certain vendor neutral environment
   * variables. In those cases `ci.name` will be `null` and no vendor specific
   * boolean will be set to `true`.
   */
  export const isCI: boolean;

  /**
   * Returns a boolean if PR detection is supported for the current CI server.
   * Will be `true` if a PR is being tested, otherwise `false`. If PR detection is
   * not supported for the current CI server, the value will be `null`.
   */
  export const isPR: boolean | null;

  /** CI environment name */
  export const name: string | null;
}

declare module '~build/meta' {}

declare module '~build/package' {
  /** Package name */
  export const name: string;

  /** Package version */
  export const version: string;

  /** Package description */
  export const description: string;

  /** Package keywords */
  export const keywords: string[];

  /** Package license */
  export const license: string;

  /** Package author */
  export const author: string;
}
