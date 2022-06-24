declare module '~build/time' {
  declare const time: Date;
  export = time;
}

declare module '~build/info' {
  /** Github repo url */
  declare const github: string | null;
  /** The current branch */
  declare const branch: string;
  /** SHA of the current commit */
  declare const sha: string;
  /** The first 10 chars of the current SHA */
  declare const abbreviatedSha: string;
  /** The tag for the current SHA (or `null` if no tag exists) */
  declare const tag: string | null;
  /** Tag for the closest tagged ancestor (or `null` if no ancestor is tagged) */
  declare const lastTag: string | null;
  /**
   * Number of commits since the closest tagged ancestor.
   * `0` if this commit is tagged, or `Infinity` if no ancestor is tagged.
   */
  declare const commitsSinceLastTag: number;
  /** The committer of the current SHA */
  declare const committer: string;
  /** The commit date of the current SHA */
  declare const committerDate: string;
  /** The author for the current SHA */
  declare const author: string;
  /** The authored date for the current SHA */
  declare const authorDate: string;
  /** The commit message for the current SHA */
  declare const commitMessage: string;
}
