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
CLI displays differences in three formats.

#### - stylish (default)
```gendiff <filepath1> <filepath2>```
or
```gendiff --format stylish <filepath1> <filepath2>```

Displays differences as a nested structure.

[![asciicast](https://asciinema.org/a/3Vlv8oe7pGPNQIztVAygJnhS5.svg)](https://asciinema.org/a/3Vlv8oe7pGPNQIztVAygJnhS5)

#### - plain
```gendiff --format plain <filepath1> <filepath2>```

Displays a text description of differences.

[![asciicast](https://asciinema.org/a/raBHjakwsKPTMNoBLUWKih3ld.svg)](https://asciinema.org/a/raBHjakwsKPTMNoBLUWKih3ld)

#### - json
```gendiff --format json <filepath1> <filepath2>```

Displays differences in JSON format for processing result by other programs.

[![asciicast](https://asciinema.org/a/atHsYyKaK3EevFW6MavPvH6gt.svg)](https://asciinema.org/a/atHsYyKaK3EevFW6MavPvH6gt)


