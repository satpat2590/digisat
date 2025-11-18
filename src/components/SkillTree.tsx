// SkillTree.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './SkillTree.css';

interface SkillNode {
  name: string;
  points: number;
  completed_tasks: number;
  children?: SkillNode[];
  category?: string;
  path?: string;
}

const API_URL = 'https://tasks-api-71v5.onrender.com';

const SkillTree: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAndRenderTree();
  }, []);
  
  const fetchAndRenderTree = async () => {
    try {
      const response = await fetch(`${API_URL}/api/skill-tree`);
      const data = await response.json();
      console.log(data);
      renderTree(data);
    } catch (error) {
        console.error('Failed to fetch skill tree:', error);
    } finally {
        setLoading(false);
    }
  };
  
  const renderTree = (data: SkillNode) => {
    if (!svgRef.current) return;
    
    const width = 1400;
    const height = 900;
    const nodeRadius = 30;
    
    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);
    
    // Create container for zoom/pan
    const g = svg.append('g');
    
    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });
    
    svg.call(zoom);
    
    // Create tree layout
    const treeLayout = d3.tree<SkillNode>()
      .size([width - 300, height - 200])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
    
    // Create hierarchy from data
    const root = d3.hierarchy(data);
    const treeNodes = treeLayout(root);
    
    // Create link generator
    const linkGenerator = d3.linkVertical<any, d3.HierarchyPointNode<SkillNode>>()
      .x(d => d.x + 150)
      .y(d => d.y + 100);
    
    // Draw links
    g.selectAll('.link')
      .data(treeNodes.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', '#33ff00')
      .attr('stroke-width', 2)
      .attr('opacity', 0.3);
    
    // Draw nodes
    const nodes = g.selectAll('.node')
      .data(treeNodes.descendants())
      .enter()
      .append('g')
      .attr('class', d => `node ${d.data.points > 0 ? 'active' : 'inactive'}`)
      .attr('transform', d => `translate(${d.x + 150}, ${d.y + 100})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d.data);
      });
    
    // Node circles with dynamic sizing
    nodes.append('circle')
      .attr('r', d => {
        if (d.depth === 0) return 40; // Root
        if (d.depth === 1) return 35; // Categories
        const baseSize = nodeRadius;
        const pointBonus = Math.log(d.data.points + 1) * 3;
        return Math.min(baseSize + pointBonus, 50);
      })
      .attr('fill', d => {
        if (d.depth === 0) return '#ffffff';
        if (d.depth === 1) {
          switch(d.data.category) {
            case 'mental': return '#00ffff';
            case 'physical': return '#ff6600';
            case 'social': return '#ff00ff';
            case 'financial': return '#ffff00';
            default: return '#33ff00';
          }
        }
        return d.data.points > 0 ? '#33ff00' : '#1a1a1a';
      })
      .attr('stroke', d => {
        if (d.depth === 0) return '#33ff00';
        if (d.depth === 1) return '#33ff00';
        return d.data.points > 0 ? '#33ff00' : '#333333';
      })
      .attr('stroke-width', d => d.data.points > 0 ? 3 : 1);
    
    // Node labels
    nodes.append('text')
      .attr('dy', -40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#33ff00')
      .style('font-family', 'Courier New, monospace')
      .style('font-size', d => d.depth === 0 ? '16px' : d.depth === 1 ? '14px' : '12px')
      .text(d => d.data.name);
    
    // Points labels
    nodes.append('text')
      .attr('dy', 0)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .style('font-family', 'Courier New, monospace')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(d => d.data.points || '0');
    
    // Task count labels
    nodes.append('text')
      .attr('dy', 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#999999')
      .style('font-family', 'Courier New, monospace')
      .style('font-size', '10px')
      .text(d => d.data.completed_tasks > 0 ? `${d.data.completed_tasks} tasks` : '');
    
    // Add hover effect
    nodes
      .on('mouseenter', function(_event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', () => {
            const currentR = d3.select(this).attr('r');
            console.log(d.data.points);
            return parseFloat(currentR as string) * 1.2;
          });
      })
      .on('mouseleave', function(_event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', () => {
            if (d.depth === 0) return 40;
            if (d.depth === 1) return 35;
            const baseSize = nodeRadius;
            const pointBonus = Math.log(d.data.points + 1) * 3;
            return Math.min(baseSize + pointBonus, 50);
          });
      });
    
    // Center the view
    const bounds = g.node()?.getBBox();
    if (bounds) {
      const fullWidth = bounds.width;
      const fullHeight = bounds.height;
      const midX = bounds.x + fullWidth / 2;
      const midY = bounds.y + fullHeight / 2;
      
      const scale = 0.8 / Math.max(fullWidth / width, fullHeight / height);
      const translate = [width / 2 - scale * midX, height / 2 - scale * midY];
      
      svg.call(
        zoom.transform as any,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      );
    }
  };
  
  if (loading) {
    return (
      <div className="skill-tree-container">
        <h1>LOADING SKILL TREE...</h1>
      </div>
    );
  }
  
  return (
    <div className="skill-tree-container">
      <h1>SKILL TREE</h1>
      
      {selectedNode && (
        <div className="node-info">
          <h3>{selectedNode.name}</h3>
          <p><span className="label">Points:</span> {selectedNode.points}</p>
          <p><span className="label">Tasks:</span> {selectedNode.completed_tasks}</p>
          {selectedNode.path && (
            <p className="path"><span className="label">Path:</span> {selectedNode.path}</p>
          )}
          <button onClick={() => setSelectedNode(null)}>CLOSE</button>
        </div>
      )}
      
      <div className="controls">
        <p>Click nodes for details • Scroll to zoom • Drag to pan</p>
      </div>
      
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SkillTree;