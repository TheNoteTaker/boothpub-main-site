# Technical Context

Last Updated: [Current Date]

## Core Technologies

- Astro
- React (for interactive components)
- TypeScript
- Tailwind CSS
- Radix UI (for accessible UI components)

## Integration Patterns

### React Components in Astro

- Interactive React components should be created as standalone .tsx files
- Use client:load directive for components that need immediate interactivity
- When using Radix UI components, prefer pure React components over Astro components
- Compound components (like Accordion) must maintain their React component hierarchy

### Image Handling

- Remote images require explicit width and height attributes
- Use optimizeImage utility for image optimization
- Always provide width and height to both optimizeImage and Image components
- Always maintain alt text when modifying image attributes
- Alt text must be descriptive and meaningful
- Use empty string ("") for decorative images only
- Consider using inferSize={true} for remote images when dimensions are unknown

## Key Libraries/Frameworks

### UI Components

- Radix UI for accessible, composable components
- Lucide Icons for consistent iconography
- Tailwind CSS for styling

## Development Environment

- Node.js
- TypeScript
- VS Code with Astro extension

## Technical Constraints

- React components using Radix UI must maintain proper component hierarchy
- Interactive components must be client-side rendered
- All images must have proper width, height, and alt attributes
- Remote images require explicit dimensions to prevent CLS
- Never remove alt text when updating other image attributes
