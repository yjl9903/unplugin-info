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

  /** The tags for the current SHA*/
  export const tags: string[];

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

  /** Gets whether this represents a clean working branch. */
  export const isClean: boolean;
}

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

  export const dependencies: Record<string, string>;

  export const devDependencies: Record<string, string>;
}

declare module '~build/meta' {
  export const message: string;
}
