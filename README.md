# ElephantDrive Cli 

A command line interface to query ElephantDrived users' data for troubleshooting. 

## Getting started

### Prerequisites

Install Node and npm at [nodejs.org/en/download/](https://nodejs.org/en/download/)

### Installing

```bash
git clone https://elephantdrive.git.beanstalkapp.com/edcli.git
cd edcli
npm install -g
```

That's it! 

## Usage 

### Log in to your account

The first thing to do is to login with your account (or admin account). This step is performed only once. Your credentials will be stored in ```~/.config/configstore/elephant.json``` (for mac/linux). To log in, run the following command: 

```bash
elephant auth --env [ENVIRONMENT] 
```

Where ```ENVIRONMENT``` is the environment you want to log in with (QA, STG, or LIVE). It is set to LIVE by default. You will be prompted to enter your credentials and an API key. 

### Quering users' information 

You have several commands that gets you user's account information. Here is a list of the currently available commands: 

``` bash
devices     Get all devices
configs     Get device configuration
sub         Get account subscription information
usage       Get account usage information
```

You can either get information about your own account or about other users (if you have admin privilages). Here are some example commands demonstrating usage: 

```bash
elephant devices                             # will return device information about your own account
elephant devices -u other_user@elepha.net    # will return device information for other_user@elepha.net 

# another way to pass optional arguments (I prefer this way) 
elephant -u other_user@elepha.net devices    
elephant -u other_user@elepha.net usage
```

Here are sample output of some of the commands:

```bash
==========================

Usage
activeSize                     7.31 GB 
versionSize                    28.15 MB
trashSize                      0 B     
archivedSize                   80.74 MB

==========================

Subscription
subscriptionName               Personal Monthly - 50 GB
subscriptionDescriptor         Personal Plan           
maxFileLength                  1 GB                    
capacity                       50 GB                   
subscriptionState              Active
```

## History

