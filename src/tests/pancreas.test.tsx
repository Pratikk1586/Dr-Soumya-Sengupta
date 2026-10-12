// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnimatedPancreas } from '../components/pancreas/AnimatedPancreas';
import {
  PANCREAS_DATA,
  HOTSPOT_LIST,
  CATEGORY_TABS,
  type PancreasPartId,
} from '../components/pancreas/pancreasData';

describe('Pancreas System Data Integrity', () => {
  it('contains all 8 required anatomical structures', () => {
    const requiredParts: PancreasPartId[] = [
      'islets',
      'tail',
      'body',
      'head',
      'duct',
      'duodenum',
      'vasculature',
      'bile-duct',
    ];
    for (const part of requiredParts) {
      expect(PANCREAS_DATA[part]).toBeDefined();
      expect(PANCREAS_DATA[part].name).toBeTruthy();
      expect(PANCREAS_DATA[part].scientificName).toBeTruthy();
      expect(PANCREAS_DATA[part].stat).toBeTruthy();
      expect(PANCREAS_DATA[part].clinicalMarker).toBeTruthy();
      expect(PANCREAS_DATA[part].description).toBeTruthy();
      expect(PANCREAS_DATA[part].diabeticRelevance).toBeTruthy();
      expect(PANCREAS_DATA[part].hotspot).toBeDefined();
      expect(typeof PANCREAS_DATA[part].hotspot.cx).toBe('number');
      expect(typeof PANCREAS_DATA[part].hotspot.cy).toBe('number');
    }
  });

  it('has correctly configured category tabs', () => {
    expect(CATEGORY_TABS.length).toBeGreaterThanOrEqual(4);
    const categoryIds = CATEGORY_TABS.map((t) => t.id);
    expect(categoryIds).toContain('all');
    expect(categoryIds).toContain('endocrine');
    expect(categoryIds).toContain('exocrine');
    expect(categoryIds).toContain('vascular');
  });

  it('has hotspots configured for all key clinical targets', () => {
    expect(HOTSPOT_LIST).toContain('islets');
    expect(HOTSPOT_LIST).toContain('duct');
    expect(HOTSPOT_LIST).toContain('head');
    expect(HOTSPOT_LIST).toContain('tail');
  });
});

describe('AnimatedPancreas Component Rendering & Interaction', () => {
  it('renders the 3D interactive pancreas region with accessibility attributes', () => {
    render(<AnimatedPancreas />);
    const region = screen.getByRole('region', {
      name: /3D Interactive Pancreas & Endocrine Visualization/i,
    });
    expect(region).toBeDefined();
  });

  it('renders the initial anatomical details card', () => {
    render(<AnimatedPancreas initialPart="islets" showDetailsCard={true} />);
    expect(screen.getByText('Islets of Langerhans')).toBeDefined();
    expect(screen.getByText(/Insulae Pancreaticae/i)).toBeDefined();
    expect(screen.getByText(/C-Peptide & Fasting Insulin/i)).toBeDefined();
    expect(screen.getByText(/1–2 Million Micro-Islets/i)).toBeDefined();
  });

  it('allows switching category tabs to filter anatomical axes', () => {
    render(<AnimatedPancreas showCategoryTabs={true} />);
    const endocrineTab = screen.getByRole('button', { name: /Endocrine Axis/i });
    expect(endocrineTab).toBeDefined();

    fireEvent.click(endocrineTab);
    expect(endocrineTab.getAttribute('aria-pressed')).toBe('true');

    const exocrineTab = screen.getByRole('button', { name: /Exocrine & Ducts/i });
    fireEvent.click(exocrineTab);
    expect(exocrineTab.getAttribute('aria-pressed')).toBe('true');
  });

  it('invokes callback when clicking hotspots or anatomical parts', async () => {
    const handlePartClick = vi.fn();
    render(<AnimatedPancreas onPartClick={handlePartClick} showHotspots={true} />);

    // Click the Duct of Wirsung hotspot callout button
    const ductCallout = screen.getByText('Duct of Wirsung');
    expect(ductCallout).toBeDefined();
    fireEvent.click(ductCallout);
    expect(handlePartClick).toHaveBeenCalledWith('duct');
    expect(await screen.findByRole('heading', { level: 3, name: /Main Pancreatic Duct/i })).toBeDefined();
  });
});
