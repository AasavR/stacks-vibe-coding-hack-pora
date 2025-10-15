#!/usr/bin/env bash
# Optional clarinet local test setup
# Requires clarinet installed: https://github.com/hirosystems/clarinet

clarinet new pora-test
cd pora-test
# replace contracts/default.clar with clarity/proof-of-real-asset.clar
# run tests
clarinet test
