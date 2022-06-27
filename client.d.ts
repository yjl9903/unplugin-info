declare module '~build/time' {
  const time: Date;

  export = time;
}

declare module '~build/info' {
  /** CI environment name */
  export const CI: string | null;

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

  /** Tag for the closest tagged ancestor (or `null` if no ancestor is tagged) */
  export const lastTag: string | null;

  /**
   * Number of commits since the closest tagged ancestor.
   * `0` if this commit is tagged, or `Infinity` if no ancestor is tagged.
   */
  export const commitsSinceLastTag: number;

  /** The committer of the current SHA */
  export const committer: string;

  /** The commit date of the current SHA */
  export const committerDate: string;

  /** The author for the current SHA */
  export const author: string;

  /** The authored date for the current SHA */
  export const authorDate: string;

  /** The commit message for the current SHA */
  export const commitMessage: string;
}
