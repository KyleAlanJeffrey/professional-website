import { getCommitDiffToMain } from "@/app/api";
import { GitHubCompareResponse } from "@/app/types";
import { useEffect, useState } from "react";

const COLOR_PALETTE = [
  "bg-purple-400",
  "bg-orange-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-red-400",
  "bg-yellow-400",
  "bg-pink-400",
  "bg-teal-400",
  "bg-indigo-400",
];
export type CommitType = {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  parents: {
    sha: string;
    url: string;
    html_url: string;
  }[];
};

function constructDiffString(files: GitHubCompareResponse["files"]) {
  if (!files || files.length === 0) return { add: "", del: "" };
  let adds = files.reduce((acc, file) => acc + (file.additions || 0), 0);
  let dels = files.reduce((acc, file) => acc + (file.deletions || 0), 0);
  return { add: `+${adds}`, del: `-${dels}` };
}
function getDiffCounts(files: GitHubCompareResponse["files"]) {
  if (!files || files.length === 0) return { adds: 0, dels: 0 };
  return {
    adds: files.reduce((acc, file) => acc + (file.additions || 0), 0),
    dels: files.reduce((acc, file) => acc + (file.deletions || 0), 0),
  };
}
export function getCommitColor(index: number): string {
  return COLOR_PALETTE[index % COLOR_PALETTE.length];
}

function formatDateToRelative(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
}
function Commit(props: { commit: CommitType; index: number }) {
  const [commitDiff, setCommitDiff] = useState<GitHubCompareResponse>({});
  const [repoName, setRepoName] = useState("");
  const [relativeTime, setRelativeTime] = useState("");
  useEffect(() => {
    const _repoName =
      props.commit.html_url.split("/")[3] +
      "/" +
      props.commit.html_url.split("/")[4];
    if (props.commit.parents.length > 0 && props.commit.sha) {
      getCommitDiffToMain(
        _repoName,
        props.commit.parents[0].sha,
        props.commit.sha
      ).then((data) => {
        setCommitDiff(data);
      });
    }
    setRepoName(_repoName);
  }, [props.commit]);
  useEffect(() => {
    setRelativeTime(
      formatDateToRelative(new Date(props.commit.commit.author.date)),
    );
  }, [props.commit.commit.author.date]);
  const diff = constructDiffString(commitDiff.files);
  const { adds, dels } = getDiffCounts(commitDiff.files);
  const intensityColor =
    adds || dels
      ? adds >= dels
        ? "bg-green-500"
        : "bg-red-500"
      : "bg-gray-400";
  return (
    <a
      href={props.commit.html_url}
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group cursor-pointer p-2 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div
        className={`w-4 h-4 ${intensityColor} transition-all duration-300 group-hover:scale-110`}
      ></div>
      <div className="flex-1 min-w-0">
        <div
          className="text-sm text-black dark:text-white font-bold transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 tracking-[0.05em] break-words"
          style={{ fontFamily: "monospace" }}
        >
          {props.commit.commit.message}
        </div>
        <div
          className="text-xs text-gray-600 dark:text-gray-400 font-bold tracking-[0.1em]"
          style={{ fontFamily: "monospace" }}
        >
          {relativeTime || "—"} • {repoName}
        </div>
      </div>
      <div
        className="text-xs transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300 font-bold tracking-[0.1em] whitespace-nowrap sm:ml-auto"
        style={{ fontFamily: "monospace" }}
      >
        <span className="text-green-400">{diff.add}</span>{" "}
        <span className="text-red-400">{diff.del}</span>
      </div>
    </a>
  );
}

export default Commit;

// {
//     "sha": "d685ba58ce968b173af41275582454a8c478b87e",
//     "node_id": "C_kwDOPYYActoAKGQ2ODViYTU4Y2U5NjhiMTczYWY0MTI3NTU4MjQ1NGE4YzQ3OGI4N2U",
//     "commit": {
//         "author": {
//             "name": "kylejeffrey",
//             "email": "kylejeffrey@stoutagtech.com",
//             "date": "2025-08-07T16:35:28Z"
//         },
//         "committer": {
//             "name": "kylejeffrey",
//             "email": "kylejeffrey@stoutagtech.com",
//             "date": "2025-08-07T16:35:28Z"
//         },
//         "message": "feat: Get projects working",
//         "tree": {
//             "sha": "04f16cfe42aa60f267ffb28e2351fd0d65770289",
//             "url": "https://api.github.com/repos/KyleAlanJeffrey/personal-website/git/trees/04f16cfe42aa60f267ffb28e2351fd0d65770289"
//         },
//         "url": "https://api.github.com/repos/KyleAlanJeffrey/personal-website/git/commits/d685ba58ce968b173af41275582454a8c478b87e",
//         "comment_count": 0,
//         "verification": {
//             "verified": false,
//             "reason": "unsigned",
//             "signature": null,
//             "payload": null,
//             "verified_at": null
//         }
//     },
//     "url": "https://api.github.com/repos/KyleAlanJeffrey/personal-website/commits/d685ba58ce968b173af41275582454a8c478b87e",
//     "html_url": "https://github.com/KyleAlanJeffrey/personal-website/commit/d685ba58ce968b173af41275582454a8c478b87e",
//     "comments_url": "https://api.github.com/repos/KyleAlanJeffrey/personal-website/commits/d685ba58ce968b173af41275582454a8c478b87e/comments",
//     "author": null,
//     "committer": null,
//     "parents": [
//         {
//             "sha": "bf2fa91594d75be8fe5ee66469e4e7e05d4939c6",
//             "url": "https://api.github.com/repos/KyleAlanJeffrey/personal-website/commits/bf2fa91594d75be8fe5ee66469e4e7e05d4939c6",
//             "html_url": "https://github.com/KyleAlanJeffrey/personal-website/commit/bf2fa91594d75be8fe5ee66469e4e7e05d4939c6"
//         }
//     ]
