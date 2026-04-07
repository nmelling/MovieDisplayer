#!/usr/bin/env bun

import { Command } from "commander";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const program = new Command();

program
  .name("project-cli")
  .description("CLI to apply some project commands more easily");

program
  .command("clean-install")
  .description("Reset setup install")
  .action(() => {
    const NODE_MODULE_PATH = path.join(__dirname, "../node_modules");
    const NUXT_DIST_PATH = path.join(__dirname, "../.nuxt");

    if (fs.existsSync(NODE_MODULE_PATH)) fs.rmSync(NODE_MODULE_PATH, { recursive: true, force: true });
    if (fs.existsSync(NUXT_DIST_PATH)) fs.rmSync(NUXT_DIST_PATH, { recursive: true, force: true });
  });

program
  .command("init-install")
  .description("Setup project install")
  .action(() => {
    const rootPath = path.join(__dirname, "..");
    execSync("bun install", {
      cwd: rootPath,
    });
  });

program.parse();
