import { GitHubCompareResponse, GitHubRepoAPI } from "./types";

const username = "Kylealanjeffrey";
const accessToken = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;

const myGithubUsernames = [
  "kylealanjeffrey",
  "alphabeard",
  "kjeffery",
  "business kyle",
  "kylejeffrey",
];

export async function getCommitDiffToMain(
  repoPath: string,
  parentSha: string,
  sha: string,
): Promise<GitHubCompareResponse | null> {
  if (!accessToken) {
    console.error("No GitHub access token found.");
    return null;
  }
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoPath}/compare/${parentSha}...${sha}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching repos: ${error}`);
    return null;
  }
}

export async function getAllRepos(): Promise<GitHubRepoAPI[]> {
  if (!accessToken) {
    console.error("No GitHub access token found.");
    return [];
  }
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=200`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error fetching repos: ${error}`);
    return [];
  }
}

export async function getLanguageStats() {
  const repos = await getAllRepos();
  if (!Array.isArray(repos)) {
    return [];
  }

  const totals: Record<string, number> = {};
  await Promise.all(
    repos.map(async (repo) => {
      if (repo.fork || !repo.languages_url) {
        return;
      }
      try {
        const response = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (!data || typeof data !== "object") {
          return;
        }
        Object.entries(data).forEach(([language, bytes]) => {
          if (typeof bytes === "number") {
            totals[language] = (totals[language] || 0) + bytes;
          }
        });
      } catch (error) {
        console.error(`Error fetching languages for ${repo.name}: ${error}`);
      }
    }),
  );

  const totalBytes = Object.values(totals).reduce(
    (sum, value) => sum + value,
    0,
  );
  if (!totalBytes) {
    return [];
  }

  return Object.entries(totals)
    .map(([language, bytes]) => ({
      language,
      percent: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);
}
export async function getAllCommits(): Promise<any[]> {
  let all_commits: any[] = [];
  const repos = await getAllRepos();

  console.log(`found ${repos.length} repos`);
  // Get all commits for each repo
  await Promise.all(
    repos.map(async (repo) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.warn(`Unexpected commits response for ${repo.name}:`, data);
          return;
        }
        all_commits.push(...data);
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}: ${error}`);
        return;
      }
    }),
  );

  //   sort by time
  all_commits.sort((a, b) => {
    return new Date(b.commit.author.date) - new Date(a.commit.author.date);
  });
  // filter out commits that arent me
  all_commits = all_commits.filter(
    (commit) =>
      (commit.author?.login &&
        myGithubUsernames.includes(commit.author.login.toLowerCase())) ||
      myGithubUsernames.includes(commit.commit.author.name.toLowerCase()),
  );
  console.log(`found ${all_commits.length} commits in total`);
  return Promise.resolve(all_commits);
}

export async function getWatchedYoutubeVideos() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCJbPGzawDH1njbqV-D5HqKw&maxResults=50&order=date&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  );
  const data = await response.json();
  return data.items;
}

export async function getDailyThoughts() {
  // Fetch metadata list from github
  // https://github.com/KyleAlanJeffrey/daily-haiku/blob/main/daily-response/metadata.txt
  const url =
    "https://raw.githubusercontent.com/KyleAlanJeffrey/daily-haiku/main/daily-response/metadata.txt";
  const response = await fetch(url);
  // Next line separated list of files
  let entries = await response.text();
  entries = entries.split("\n").filter((entry) => entry.length > 0);
  // For each entry, fetch the file
  const responses = await Promise.all(
    entries.map(async (entry) => {
      try {
        const url = `https://raw.githubusercontent.com/KyleAlanJeffrey/daily-haiku/main/daily-response/${entry}`;
        const response = await fetch(url);
        const data = await response.json();
        return data["entries"];
      } catch (e) {
        console.error(`Error fetching daily thought ${entry}: ${e}`);
        return [];
      }
    }),
  );
  // Flatten the list of lists sorrted by date
  const flattened = responses.flat().sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return flattened;
}
