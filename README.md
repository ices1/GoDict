# GoDict

### Desc

Command line tool for translating English words into Chinese.

### install
```js
    npm install -g godict
```

### run
```bash
    $ godict -V
    #1.3.0

    $ godict book
    # #  1
    # Cn:  (纸版或电子版的)书
    # En:  a written text that can be published in printed or electronic form
    # example:  ...


    # cli automatically provides continuous query function
    godict <input>


    # If there is no query result, the association vocabulary will be promoted
    godict lov
    
    # <<< msg: 'lov' not found, the following are relative words  ^_^
    #   0: lovable
    #   1: love
    #   2: love affair
    #   3: love bite


    # exit the cli 
    godict gg


```