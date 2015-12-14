starter-templates-desktop
=========================

Starter templates for Bridge Front Offices Desktop

## Requirements
### Ruby

Check if Ruby is installed

```bash 
ruby -v
```

How to install :

https://www.ruby-lang.org/en/documentation/installation/

### NodeJs

Check if NodeJs is installed

```bash 
node -v
```

How to install : use nvm !

(nvm will prevent sudo conflicts when you're installing node or updating some librairies)

https://github.com/creationix/nvm#install-script

## Setup

```bash 
gem install sass scss-lint
npm install -g git+https://github.com/Leadformance/generator-bridge-template.git
yo bridge-template
```

## Tracking

```bash
data-lf-tracking='{"bind":"value","category":"value","label":"value"}'
Ex: data-lf-tracking='{"bind":"click","category":"resultshowphone","label":"{{pos.name}}##{{pos.phone}}"}'
```

## Javascript
Please use only data attribute for javascript selector

## Release Note

https://github.com/Leadformance/starter-templates-desktop/releases/tag/5.0.0

## Boostrap
Unused bootstrap components have been disabled.
Feel free to reactivate them if you need to use a bootstrap component.
Path: src/vendors/_bootstrap.scss
