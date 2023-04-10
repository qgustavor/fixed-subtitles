# Fixed Subtitles

Watching subtitles with errors is not pleasing. While some errors can be just simple typos, others can be entire missing lines or completely wrong translations. This project aims to provide a way to easily download and share fixed subtitles using git to handle contributions and organization.

## Downloading subtitles

**Check the website: https://qgustavor.github.io/fixed-subtitles/**

Ideally you just need to download subtitles (unzipping if needed) to the same directory as the video and most players will detect the subtitle and use it automatically.

In some cases, like when you don't have the original video, the subtitle needs to be opened manually and fonts need to be installed or muxed to the video. You can use tools such as [aslass](https://github.com/kaegi/alass/) to take care of timing differences. This project does not share fonts, just subtitles.

## Contributing

This project accepts contributions via pull requests. You can fork the repository, import existing subtitles, fix those and send a pull request. If this is your first time using git check [GitHub quickstart](https://docs.github.com/get-started/quickstart/fork-a-repo).

*Tip when contributing:* check existent files and commits and mimic the style.

Initially this project was aimed to only include subtitles from dead or inactive groups, but, since some active groups do not fix their subtitles, those can be included too.

When importing existent subtitles consider including related subtitles, even if no errors were found on them, because, later, errors might be found on them. By importing those in one commit it will avoid the need of a second commit importing those subtitles.

### File organization

Subtitles are stored in the `subtitles` directory, the other files are related to the website.

There is a directory in the subtitles directory for each show. Each directory is named after the AniList ID, followed by the show title, which can be abbreviated. The show ID is used to load data which is displayed in the website, in the other hand, the show title in the filename is only used for organization, the title returned by AniList's API is used instead.

Inside each show directory there is a directory for each group. The name of the directory is the name of the group and is shown in the website when more than one group translated a show.

Inside each group directory there are subtitles named after the video name, e.g. `video.mkv` becomes `video.ass`. If a video have multiple subtitles you can add a suffix to the name. There's also a `README.md` which must include at least the language of the subtitles, which is displayed in the website. For new contributions it must also include information about what was fixed.

### Commit organization

Each show is fixed with at least two commits: one adding the original subtitle data and a second with the fixes.

Older commits included info about the fixes. For new contributions this information should be placed in each group `README.md`.

Try to copy the style of commit titles.

### Local development

If you want to check your changes locally you can run the following commands:

```bash
# Install dependencies
npm install

# Update data.json
npm run populate-data

# Start development server at http://localhost:3000
npm run dev
```
