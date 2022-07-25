# Imagenes-Cardiovasculares

## Table of contents
- [Video Frames API ](#vover-api-and-backoffice)
  * [Table of contents](#table-of-contents)
  * [Overview](#overview)
    + [API](#api)
  * [Requirements](#requirements)
  * [How to run the project](#how-to-run-the-project)
    + [API Step-By-Step](#api-step-by-step)
  * [How to run the tests](#how-to-run-the-tests)
  * [How the project is deployed](#how-the-project-is-deployed)
  * [Configuration Details](#configuration-details)
    + [How to assemble the .env file](#how-to-assemble-the-env-file)
    + [How to install *FFmpeg* for Vover API](#how-to-install--ffmpeg--for-vover-api)

## Overview
- **API**
    - This solution is developed in JavaScript and it contains all the back-end logic for the entire project. It is divided into further sub-systems which we will explain below on this document.

### API
TBD

## How to run the project
### API Step-By-Step
TBD

 ## How to run the tests
TBD

## How the project is deployed
TBD

### How to assemble the .env file
TBD

### How to install *FFmpeg*

*FFmpeg* is a suite of libraries and programs for handling audio, video and another multimedia files or streams. In this API, *FFmpeg* is used to split the video into frames in order to store the images on a Amazon S3 Bucket.

In order for the library to work, the program *FFmpeg* must be installed somewhere on your system. You can find the steps for a correct installation on the next guide:

1. Go to the releases in the *FFmpeg* repo.
2. Download the release that works best on your system.
3. Extract the downloaded file on the desired location.
4. Point the PATH environment variable to the `/bin` folder of *FFmpeg*.
    - In Windows Settings, search for variables and click in Edit the system environment variables.
    - Then click under Environment Variables, Path and then Edit.
    - This will open a pop up. In it, click in the New button which let you write a new row where you must write down the path to the bin folder of the downloaded file.
    - Restart your computer and open up a new terminal and execute `ffmpeg -version` to test if it has been successfully added to the PATH variable. 
    - If it hasn't been added correctly, the message `'ffmpeg' is not recognized as an internal or external command, operable program or batch file` or similar, should appear on the terminal console.

> If you have installed *FFmpeg* successfully but still find troubles creating a thought regarding to the clip duration retrieval step, be sure that the clip actually works by trying to play it on a media player such as the Windows Media Player or VLC.
