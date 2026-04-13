/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/mining-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleMiningAiCompliance } from "./tools/mining-ai-compliance.js";

const server = new McpServer({
  name: "csoai-mining-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const MiningAiComplianceShape = {
  system_name: z.string().describe("Name of mining AI system"),
  ai_function: z.string().describe("Function (autonomous haulage, geological modeling, safety monitoring, environmental compliance, resource estimation)"),
  safety_level: z.string().describe("Safety criticality (underground, open-pit, processing, tailings, transport)"),
  environmental_scope: z.string().describe("Environmental scope (emissions, water, tailings, rehabilitation, biodiversity)"),
  jurisdiction: z.string().describe("Operating jurisdiction (Australia, Canada, EU, South Africa, Chile, etc.)"),
};

// ─── Tool 1: mining_ai_compliance ───
(server.tool as any)(
  "mining_ai_compliance",
  "Assess compliance for AI in mining operations. Covers autonomous equipment, safety, environmental monitoring, and community impact.",
  MiningAiComplianceShape,
  async (args: any) => {
    const result = handleMiningAiCompliance(args.system_name, args.ai_function, args.safety_level, args.environmental_scope, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
