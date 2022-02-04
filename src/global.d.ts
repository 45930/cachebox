/// <reference types="@sveltejs/kit" />

export type DeployedSnappInterface = {
  title: string,
  address: string,
  subtitle?: string,
  reward?: number,
  ipfsPromptHash?: string,
  ipfsSolvedHash?: string
}