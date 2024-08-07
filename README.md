<h1 align="center" id="title">Emoji feedback collector</h1>

<p id="description">A slick feedback collection system. It allows users to provide quick emoji-based feedback along with optional text comments. The app features a sleek animated interface and stores feedback data locally in json.</p>

<h2>🚀 Demo</h2>

![compressed_showcase](https://github.com/user-attachments/assets/dcdbf280-724c-4a1e-bbc6-a709f961adfe)


[emoji-feedback.remcostoeten.com](emoji-feedback.remcostoeten.com)

<h2>Project Screenshots:</h2>


<h2>🧐 Features</h2>

The initial storing in json local version only is on the branch `json-version`

```bash
#cd root of the project
git checkout json-version
```

<small> check `config.ts` for the configuration of where the logs are stored. There are two variables which determine the location called 
```bash
export const FOLDER_TO_WRITE_LOGS = 'src/core/logs'
export const LOG_FILENAME = 'feedback-log'
```
resulting in `src/core/logs/feedback-log.json`. Once feedback is  submitted it should log in JSON. Check console to see if this appers:

```bash
Feedback saved: {
  id: 1722976729403,
  opinion: '😍',
  feedback: 'hmmmmmmm',
  timestamp: '2024-08-06T20:38:49.403Z'
}
Updated feedback data: {
  feedbacks: [
    {
      id: 1722611293361,
      opinion: '🔥',
      feedback: 'heeeey',
      timestamp: '2024-08-02T15:08:13.361Z'
    },
.........
```

. The result / ui is quite a bit more outdated than the version on the `main` branch which has database storage.</small>

Here're some of the project's features:

-   🎭 Emoji-based quick feedback
-   📝 Optional text feedback
-   🎨 Animated UI using Framer Motion
-   🌐 Internationalization support
-   💾 Local storage of feedback data or cloud database storage
-   📊 Feedback data visualization page

<h2>🛠️ Installation Steps:</h2>

Contact me if you reall cant figure it out.

<h2>💻 Built with</h2>

Technologies used in the project:

-   React 19
-   NextJS 15
-   TypeScript
-   Tailwind CSS
-   Framer Motion
-   Server actions
-   i18next
-   ShadCN
-   Drizzle ORM
-   Turso SQLite

xxx Remco Stoeten. A star would be appreciated.
