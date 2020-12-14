/*
* Copyright 2020 New Relic Corporation. All rights reserved.
* SPDX-License-Identifier: Apache-2.0
*/
'use strict'

exports.config = {
  app_name: ['Adidas Reviews'],
  license_key: 'd7b7ac144a77e2086fffd1ad60129d0fc850NRAL',
  logging: {
    level: 'trace',
    filepath: '../../../newrelic_agent.log'
  },
  utilization: {
    detect_aws: false,
    detect_pcf: false,
    detect_azure: false,
    detect_gcp: false,
    detect_docker: false
  },
  transaction_tracer: {
    enabled: true
  }
}
