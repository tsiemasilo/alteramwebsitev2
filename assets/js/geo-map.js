// @ts-expect-error - Direct CDN import for browser compatibility (no import maps needed)
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
const locations = [
    { id: 'north-west', name: 'North West', number: 42, coordinates: [25.5, -26.2], labelPosition: 'top-left' },
    { id: 'polokwane', name: 'Polokwane', coordinates: [29.4, -23.9], labelPosition: 'top' },
    { id: 'limpopo', name: 'Limpopo', number: 52, coordinates: [30.5, -23.5], labelPosition: 'top-right' },
    { id: 'zeerust', name: 'Zeerust', coordinates: [26.1, -25.5], labelPosition: 'left' },
    { id: 'mbombela', name: 'Mbombela', coordinates: [31.0, -25.5], labelPosition: 'top-right' },
    { id: 'mpumalanga', name: 'Mpumalanga', number: 48, coordinates: [30.8, -26.0], labelPosition: 'right' },
    { id: 'kimberley', name: 'Kimberley', coordinates: [24.8, -28.7], labelPosition: 'left' },
    { id: 'centurion', name: 'Centurion', coordinates: [28.1, -25.9], labelPosition: 'top-right' },
    { id: 'midrand', name: 'Midrand', subtitle: 'HEAD OFFICE', coordinates: [28.1, -25.95], labelPosition: 'right', isHeadOffice: true },
    { id: 'gauteng', name: 'Gauteng', number: 53, coordinates: [28.3, -26.0], labelPosition: 'right' },
    { id: 'northern-cape', name: 'Northern Cape', number: 53, coordinates: [23.0, -28.5], labelPosition: 'left' },
    { id: 'margate', name: 'Margate', coordinates: [30.9, -30.9], labelPosition: 'right' },
    { id: 'kwazulu-natal', name: 'KwaZulu-Natal', number: 81, coordinates: [30.5, -29.0], labelPosition: 'right' },
    { id: 'western-cape', name: 'Western Cape', number: 23, coordinates: [19.5, -32.5], labelPosition: 'bottom-left' },
    { id: 'cape-town', name: 'Cape Town', coordinates: [18.5, -33.9], labelPosition: 'bottom' },
    { id: 'east-london', name: 'East London', coordinates: [27.9, -33.0], labelPosition: 'bottom-right' },
    { id: 'bloemfontein', name: 'Bloemfontein', coordinates: [26.2, -29.1], labelPosition: 'bottom' },
    { id: 'free-state', name: 'Free State', number: 26, coordinates: [26.8, -29.0], labelPosition: 'bottom' },
    { id: 'eastern-cape', name: 'Eastern Cape', number: 72, coordinates: [26.5, -32.3], labelPosition: 'bottom' }
];
const southAfricaGeoJSON = {
    "type": "FeatureCollection",
    "features": [{
            "type": "Feature",
            "properties": { "name": "South Africa" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                        [16.5, -28.6], [17.1, -29.0], [17.9, -29.9], [18.4, -32.0],
                        [18.3, -33.9], [18.9, -34.4], [19.9, -34.8], [20.7, -34.5],
                        [22.6, -34.0], [23.9, -33.8], [24.8, -33.9], [25.6, -33.7],
                        [26.4, -33.7], [27.1, -33.6], [27.7, -33.3], [28.2, -32.8],
                        [28.9, -32.2], [29.4, -31.4], [30.0, -31.0], [30.8, -30.9],
                        [31.3, -29.4], [31.5, -28.9], [31.9, -28.3], [32.1, -27.3],
                        [32.4, -26.4], [32.8, -26.0], [32.9, -25.7], [32.1, -25.5],
                        [31.3, -25.4], [31.0, -24.5], [30.9, -23.9], [30.6, -23.0],
                        [30.4, -22.3], [29.4, -22.1], [28.0, -22.8], [27.1, -23.5],
                        [26.4, -24.6], [25.0, -25.7], [23.3, -25.3], [22.6, -25.9],
                        [21.6, -26.8], [20.9, -26.8], [20.6, -26.5], [20.2, -26.8],
                        [19.9, -27.0], [19.3, -27.8], [18.9, -28.9], [18.4, -28.9],
                        [17.4, -28.7], [16.8, -28.4], [16.5, -28.6]
                    ]]
            }
        }]
};
class SouthAfricaMap {
    constructor(containerId) {
        this.width = 0;
        this.height = 0;
        this.activeLocation = null;
        const container = d3.select(`#${containerId}`);
        this.svg = container.append('svg')
            .attr('class', 'geo-map-svg');
        this.g = this.svg.append('g');
        this.projection = d3.geoMercator();
        this.path = d3.geoPath().projection(this.projection);
        this.resize();
        this.render();
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        const container = d3.select('#geo-map-container').node();
        if (!container)
            return;
        this.width = container.clientWidth;
        this.height = Math.min(this.width * 0.9, 1200);
        this.svg
            .attr('width', this.width)
            .attr('height', this.height);
        const padding = {
            left: this.width * 0.075,
            right: this.width * 0.075,
            top: this.height * 0.075,
            bottom: this.height * 0.075
        };
        this.projection.fitExtent([[padding.left, padding.top], [this.width - padding.right, this.height - padding.bottom]], southAfricaGeoJSON);
        this.updateMap();
    }
    render() {
        this.g.append('path')
            .datum(southAfricaGeoJSON)
            .attr('class', 'country-path')
            .attr('d', this.path)
            .style('fill', '#e8f0fe')
            .style('stroke', '#2c3e7a')
            .style('stroke-width', '2px')
            .style('filter', 'drop-shadow(0 4px 20px rgba(44, 62, 122, 0.2))');
        const markersGroup = this.g.append('g').attr('class', 'markers-group');
        locations.forEach(location => {
            const [x, y] = this.projection(location.coordinates) || [0, 0];
            const marker = markersGroup.append('g')
                .attr('class', `location-marker ${location.isHeadOffice ? 'head-office' : ''}`)
                .attr('data-location', location.id)
                .attr('transform', `translate(${x}, ${y})`)
                .style('cursor', 'pointer');
            marker.append('circle')
                .attr('class', 'marker-dot')
                .attr('r', location.isHeadOffice ? 9 : 7)
                .style('fill', location.isHeadOffice ? '#2c3e7a' : '#f5a623')
                .style('stroke', '#ffffff')
                .style('stroke-width', location.isHeadOffice ? '4px' : '3px')
                .style('filter', 'drop-shadow(0 2px 8px rgba(245, 166, 35, 0.5))')
                .style('transition', 'all 0.3s ease');
            const labelGroup = marker.append('g')
                .attr('class', 'label-group');
            const labelOffset = this.getLabelOffset(location.labelPosition);
            labelGroup.attr('transform', `translate(${labelOffset.x}, ${labelOffset.y})`);
            const labelBox = labelGroup.append('g')
                .attr('class', 'label-box');
            const textElements = [];
            if (location.number)
                textElements.push(location.number.toString());
            textElements.push(location.name);
            if (location.subtitle)
                textElements.push(location.subtitle);
            const textElement = labelBox.append('text')
                .attr('class', 'location-label')
                .attr('text-anchor', this.getTextAnchor(location.labelPosition))
                .style('font-size', '13px')
                .style('font-weight', '600')
                .style('fill', '#2c3e7a')
                .style('pointer-events', 'none')
                .style('user-select', 'none');
            textElements.forEach((text, index) => {
                const isNumber = !isNaN(Number(text));
                const isSubtitle = text === location.subtitle;
                textElement.append('tspan')
                    .attr('x', 0)
                    .attr('dy', index === 0 ? 0 : '1.2em')
                    .style('font-size', isSubtitle ? '10px' : '13px')
                    .style('font-weight', isNumber ? '700' : isSubtitle ? '500' : '600')
                    .style('fill', isNumber ? '#f5a623' : '#2c3e7a')
                    .text(text);
            });
            const connectorLine = labelGroup.append('line')
                .attr('class', 'connector-line')
                .attr('x1', -labelOffset.x * 0.3)
                .attr('y1', -labelOffset.y * 0.3)
                .attr('x2', -labelOffset.x * 0.8)
                .attr('y2', -labelOffset.y * 0.8)
                .style('stroke', '#2c3e7a')
                .style('stroke-width', '1.5px')
                .style('opacity', '0.4');
            marker
                .on('mouseenter', () => this.onMarkerHover(marker, true))
                .on('mouseleave', () => this.onMarkerHover(marker, false))
                .on('click', () => this.onMarkerClick(location.id, marker));
        });
    }
    getLabelOffset(position) {
        const offset = 35;
        const offsets = {
            'top': { x: 0, y: -offset },
            'bottom': { x: 0, y: offset },
            'left': { x: -offset, y: 0 },
            'right': { x: offset, y: 0 },
            'top-left': { x: -offset, y: -offset },
            'top-right': { x: offset, y: -offset },
            'bottom-left': { x: -offset, y: offset },
            'bottom-right': { x: offset, y: offset }
        };
        return offsets[position] || { x: 0, y: -offset };
    }
    getTextAnchor(position) {
        if (position.includes('left'))
            return 'end';
        if (position.includes('right'))
            return 'start';
        return 'middle';
    }
    onMarkerHover(marker, isHover) {
        marker.select('.marker-dot')
            .transition()
            .duration(200)
            .attr('r', (d, i, nodes) => {
            const currentR = parseFloat(d3.select(nodes[i]).attr('r'));
            const baseR = marker.classed('head-office') ? 9 : 7;
            return isHover ? baseR * 1.3 : baseR;
        })
            .style('fill', isHover ? '#2c3e7a' : (marker.classed('head-office') ? '#2c3e7a' : '#f5a623'))
            .style('filter', `drop-shadow(0 ${isHover ? 4 : 2}px ${isHover ? 16 : 8}px rgba(${isHover ? '44, 62, 122' : '245, 166, 35'}, ${isHover ? 0.6 : 0.5}))`);
    }
    onMarkerClick(locationId, marker) {
        d3.selectAll('.location-marker').classed('active', false);
        if (this.activeLocation === locationId) {
            this.activeLocation = null;
        }
        else {
            this.activeLocation = locationId;
            marker.classed('active', true);
        }
    }
    updateMap() {
        this.g.select('.country-path')
            .attr('d', this.path);
        locations.forEach(location => {
            const [x, y] = this.projection(location.coordinates) || [0, 0];
            this.g.select(`.location-marker[data-location="${location.id}"]`)
                .attr('transform', `translate(${x}, ${y})`);
        });
    }
}
let mapInitialized = false;
function initializeMap() {
    if (mapInitialized)
        return true;
    const mapContainer = document.getElementById('geo-map-container');
    if (mapContainer && mapContainer.clientWidth > 0) {
        new SouthAfricaMap('geo-map-container');
        mapInitialized = true;
        return true;
    }
    return false;
}
document.addEventListener('DOMContentLoaded', () => {
    if (!initializeMap()) {
        setTimeout(() => {
            if (!initializeMap()) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !mapInitialized) {
                            initializeMap();
                            observer.disconnect();
                        }
                    });
                });
                const mapContainer = document.getElementById('geo-map-container');
                if (mapContainer) {
                    observer.observe(mapContainer);
                }
            }
        }, 100);
    }
});
