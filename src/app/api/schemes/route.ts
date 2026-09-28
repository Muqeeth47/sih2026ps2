import { NextResponse } from 'next/server';
import { SCHEMES } from '@/lib/mock-data';
import type { SchemeRule } from '@/lib/types';

// In-memory runtime schemes storage
let runtimeSchemes: SchemeRule[] = [...SCHEMES];

export async function GET() {
  return NextResponse.json({ success: true, schemes: runtimeSchemes });
}

export async function POST(req: Request) {
  try {
    const updatedRule: SchemeRule = await req.json();

    const idx = runtimeSchemes.findIndex((s) => s.code === updatedRule.code);
    if (idx >= 0) {
      runtimeSchemes[idx] = { ...runtimeSchemes[idx], ...updatedRule };
    } else {
      runtimeSchemes.push(updatedRule);
    }

    return NextResponse.json({
      success: true,
      message: `Scheme rules for ${updatedRule.code} updated successfully without code deployment.`,
      scheme: runtimeSchemes[idx >= 0 ? idx : runtimeSchemes.length - 1],
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update scheme rule';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
