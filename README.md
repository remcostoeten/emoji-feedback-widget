<h1 align="center" id="title">Emoji Feedback Collector</h1>

<p id="description">A slick feedback collection system. It allows users to provide quick comments. The app features a sleek animated interface and stores all feedback data, including some geolocation (beta), in a `sqlite` database freely provided by [Turso](https://turso.io). There's also a version that stores all data locally in a `.json`  file.</p>

<h2>🚀 Demo</h2>

<small>Colors are off in the `.gif` due to compression.</small>


![emoji30](https://github.com/user-attachments/assets/c0459540-954b-422f-9eec-5afe4c33c0eb)



Live demo: [emoji-feedback.remcostoeten.com](https://emoji-survey.remcostoeten.com/)

## Configuration

The Emoji Feedback Collector can be customized through various configuration options:

### Environment-based Configuration

- ```ENABLE_LOCAL_STORAGE```: Set to 'true' to enable local storage functionality.
- ```USE_DATABASE```: Set to 'true' to use database storage instead of local storage.

### Emoji Bar Configuration

- ```HIDE_AUTOMATICALLY```: When set to ```true```, the feedback bar will automatically shift down and lower its opacity after a certain time to prevent annoyance.
- ```BAR_POSITION```: Can be set to 'top' or 'bottom' to determine the position of the feedback bar. Default is 'bottom'.

### Emoji Options

The feedback emojis can be customized. Current options are:

- 😍 (love it)
- 🔥 (DOPE!)
- 💩 (its shit)
- 🤮 (sickening)

### Timing Configuration

- ```TIME_TO_SHOW_FEEDBACK_FORM```: Set to 5000 milliseconds (5 seconds) by default. This determines how long the feedback form is shown.
- ```RATE_LIMIT_INTERVAL```: Set to 24 hours in milliseconds. This limits how often a user can submit feedback.

### Pagination

- ```DEFAULT_ITEMS_PER_PAGE```: Set to 10. This determines the number of reviews shown per page in the feedback visualization.

To modify these settings, adjust the values in the ```config.ts``` file.

<h2>🧐 Features</h2>


The initial storing in JSON local version only is on the branch [`json-version`](command:_github.copilot.openSymbolFromReferences?%5B%22json-version%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A3%2C%22character%22%3A93%7D%7D%5D%5D "Go to definition")

```bash
# cd root of the project
git checkout json-version
```

<small>Check [`config.ts`](command:_github.copilot.openSymbolFromReferences?%5B%22config.ts%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A22%2C%22character%22%3A15%7D%7D%5D%5D "Go to definition") for the configuration of where the logs are stored. There are two variables which determine the location:

```typescript
export const FOLDER_TO_WRITE_LOGS = 'src/core/logs'
export const LOG_FILENAME = 'feedback-log'
```

Resulting in [`src/core/logs/feedback-log.json`](command:_github.copilot.openSymbolFromReferences?%5B%22src%2Fcore%2Flogs%2Ffeedback-log.json%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A25%2C%22character%22%3A37%7D%7D%5D%5D "Go to definition"). Once feedback is submitted, it should log in JSON. Check the console to see if this appears:

```json
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
    ...
  ]
}
```

The result/UI is quite a bit more outdated than the version on the [`main`](command:_github.copilot.openSymbolFromReferences?%5B%22main%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22path%22%3A%22%2Fhome%2Fremcostoeten%2Fdevelopment%2Femoji-feedback%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A49%2C%22character%22%3A72%7D%7D%5D%5D "Go to definition") branch which has database storage.</small>

Here are some of the project's features:

- 🎭 Emoji-based quick feedback
- 📝 Optional text feedback
- 🎨 Animated UI using Framer Motion
- 🌐 Internationalization support
- 💾 Local storage of feedback data or cloud database storage
- 📊 Feedback data visualization page

<h2>🛠️ Installation Steps:</h2>

Contact me if you really can't figure it out.

<h2>💻 Built with</h2>

Technologies used in the project:

- React 19
- NextJS 15
- TypeScript
- Tailwind CSS
- Framer Motion
- Server actions
- i18next
- ShadCN
- Drizzle ORM
- Turso SQLite

xxx Remco Stoeten. A star would be appreciated.
