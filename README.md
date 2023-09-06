[![Actions Status](https://github.com/Victoria-Borovik/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Victoria-Borovik/frontend-project-46/actions)
![Github Actions](https://github.com/Victoria-Borovik/frontend-project-46/actions/workflows/gendiff-check.yml/badge.svg?event=push)
[![Maintainability](https://api.codeclimate.com/v1/badges/62da09c94a2505bbcf11/maintainability)](https://codeclimate.com/github/Victoria-Borovik/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/62da09c94a2505bbcf11/test_coverage)](https://codeclimate.com/github/Victoria-Borovik/frontend-project-46/test_coverage)
# Get Difference
Compares two configuration files and shows a difference.
Supports **.json** and **.yml** formats.

### Install
```
git clone git@github.com:Victoria-Borovik/frontend-project-46.git
cd frontend-project-46
make install
```

### Usage
CLI displays differences in three different formats.

##### stylish
`gendiff --format stylish <filepath1> <filepath2>`
Displaying differences as a nested structure.


##### plain
`gendiff --format plain <filepath1> <filepath2>`
Displaying a text description of differences.


##### json
`gendiff --format json <filepath1> <filepath2>`
Displaying differences in n JSON format for processing result by other programs.


