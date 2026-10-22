import type { ProjectData } from '@/types'

export const projectData: ProjectData[] = [
  {
    title: 'Projects',
    projects: [
      {
        text: 'XCloud',
        description:
          'Xcloud is a FastAPI-based API wrapper for local Ollama LLM services, featuring Faster-Whisper transcription, RAG support with ChromaDB, and web search capabilities, and more are coming.',
        icon: 'i-carbon-logo-github',
        href: 'https://github.com/rashadrsx/xcloud',
      },
      {
        text: 'rsx.iso',
        description:
          'Build your own Arch Linux ISO from dotfiles: choose config, apps, drivers, and Docker containers, clone, edit, and knit it into something completely yours',
        icon: 'i-carbon-logo-github',
        href: 'https://github.com/rashadrsx/rsx.iso',
      },
      {
        text: 'Whisper Stt',
        description:
          'Transcribe books, movies, episodes, and any other audio/video into .srt subtitles — GPU-accelerated, one command.',
        icon: 'i-carbon-logo-github',
        href: 'https://github.com/rashadrsx/whisperstt',
      },
    ],
  },
  {
    title: 'Open Source Community',
    projects: [
      {
        text: 'SageMath',
        description:
          'Sage is open source mathematical software released under the GNU General Public Licence GPLv2+, and includes packages that have compatible software licenses. People all around the globe have contributed to the development of Sage. Full documentation is available online.',
        icon: 'i-carbon-logo-github',
        href: 'https://github.com/sagemath/sage/issues?q=author%3Arashadrsx',
      },
      {
        text: 'ChatBang',
        description:
          'A CLI tool to access ChatGPT from the terminal without an API key',
        icon: 'i-carbon-logo-github',
        href: 'https://github.com/ahmedhosssam/chatbang/pull/1',
      },
      {
        text: 'pomo-tui',
        description:
          'pomodoro tui that can connect to discord perfect for "study with me"',
        icon: 'i-carbon-logo-github',
        href: 'https://github.com/hxb8/termdoro/issues?q=author%3Arashadrsx',
      },
    ],
  },
]
