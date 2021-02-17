export const createPlaceholderImage = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 9 11')
  svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink')
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('x', '0')
  rect.setAttribute('y', '0')
  rect.setAttribute('height', '100%')
  rect.setAttribute('width', '100%')
  rect.setAttribute('fill', '#F7F7F7')
  svg.appendChild(rect)
  return svg
}

export const replaceNodeWithErrorImage = (nodeElement: HTMLElement) => {
  const errorImage: Element = document.createElement('div')
  errorImage.classList.add('placeholder-image', 'placeholder-image--error')
  const svg = createPlaceholderImage()
  errorImage.appendChild(svg)
  nodeElement.parentElement?.replaceChild(errorImage, nodeElement)
}
