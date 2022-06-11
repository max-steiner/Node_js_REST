const connectedKnex = require("./knex-connector");
const { logger } = require("./logger");

function get_all_reports() {
  logger.debug("The function get_all_reports has been started.");
  return connectedKnex("reports").select("*");
}

function get_report_by_id(id) {
  logger.debug(`The function get_report_by_id has been started. ID: ${id}`);
  return connectedKnex("reports").select("*").where("id", id).first();
}

function get_report_by_parameters(license_plate, driver_id, speed) {
  if (license_plate | driver_id | speed) {
    logger.debug(
      `The function get_report_by_parameters has been started. License_plate: ${license_plate}, driver_id: ${driver_id}, speed: ${speed}`
    );
    return connectedKnex("reports")
      .select("*")
      .where("license_plate", license_plate)
      .orWhere("driver_id", driver_id)
      .orWhere("speed", speed);
  } else {
    logger.debug("Data not found.");
    return connectedKnex("reports").select("*");
  }
}

function get_raw(query) {
  logger.debug(`The function get_raw has been started: ${query}.`);
  return connectedKnex.raw(query);
}

function add_report(report) {
  logger.debug(`The reports added: ${report}.`);
  return connectedKnex("reports").insert(report);
}

function update_report(report, id) {
  logger.debug(`The report with [${id}] has been updated. Report new: ${report}.`);
  return connectedKnex("reports").where("id", id).update(report);
}

function delete_report(id) {
  logger.debug(`The report with id [${id}] has been deleted.`);
  return connectedKnex("reports").where("id", id).del();
}

module.exports = {
  get_all_reports,
  get_raw,
  get_report_by_id,
  get_report_by_parameters,
  add_report,
  update_report,
  delete_report
  };
  