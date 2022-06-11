const express = require('express')
const config = require('config')
const { logger } = require('./logger')
const reports_repo = require('./reports-repo')
const path = require('path')


logger.debug('====== System startup ========')


const port = process.env.port || 3030


const app = express()

app.use(express.static(path.join(__dirname, '/static')))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.get('/reports', async(req, res) => {
    const reports = await reports_repo.get_all_reports()
    res.status(200).json( {reports })
})

app.get('/reports/:report_id', async(req, res) => {
    const report_id = req.params.report_id
    const reports = await reports_repo.get_report_by_id(report_id)
    res.status(200).json( {reports })
})


app.post('/reports/raw', async(req, res) => {
    try {
        input = req.body
        const result = await moveis_repo.get_raw(input.query)
        res.status(201).json( {
            res: 'success',
            raws: result.rows
             })
    } catch (e) {
        logger.error(`Run raw error: ${e}`)
        res.status(400).send({
            status: 'error',
            message: e.message
        })
    }
})


app.post('/reports', async(req, res) => {
    try {
        report = req.body
        const result = await reports_repo.add_report(report)
        res.status(201).json( {
            res: 'success',
            url: `/reports/${result[0]}`,
            result
             })
    } catch (e) {
        logger.error(`Data edding error: ${e}`)
        res.status(400).send({
            status: 'error',
            message: e.message
        })
    }
})


app.delete('/reports/:report_id', async(req, res) => {
    const report_id = req.params.report_id
    try {
        const reports = await reports_repo.delete_report(report_id)
        res.status(200).json( { num_records_deleted: reports })
    }
    catch (e) {
        logger.error(`Data deliting error: ${e}`)
        res.status(400).send({
            status: 'error',
            message: e.message
        })
    }
})


app.put('/reports/:report_id', async(req, res) => {
    const report_id = req.params.report_id
    try {
        report = req.body
        const result = await reports_repo.update_report(report, report_id)
        res.status(200).json( {
            res: 'success',
            url: `/reports/${report_id}`,
            result
             })
    } catch (e) {
        logger.error(`Data updating error: ${e}`)
        res.status(400).send({
            status: 'error',
            message: e.message
        })
    }
})


//The server starting
app.listen(port, () => {
    logger.info(`The server has been started`)
    })
