import LogBlade from './index'

const logger = new LogBlade('', {
    application: 'Testing SDK',
})
logger.log({
    title: "Men",
    application: "Testing",
    subApplication: "MEN"
}).then(d => console.log(d))
