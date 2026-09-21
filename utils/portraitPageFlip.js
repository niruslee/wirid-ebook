// Compatibility adapter for page-flip 2.0.7 (pinned in package.json).
// Use its forward (outgoing sheet) fold for BOTH directions in portrait mode.
// Reflect the rendering and pointer coordinates for a left-to-right turn.
export function configurePortraitPageFlip(book) {
  window.removeEventListener('resize', book.getUI().onResize)
  const controller = book.getFlipController()
  const render = book.getRender()
  const collection = book.getPageCollection()
  const host = book.getUI().getDistElement()
  let mirrored = false

  const start = controller.start.bind(controller)
  controller.start = point => {
    const { left, pageWidth } = book.getBoundsRect()
    const pageLeft = left + pageWidth
    mirrored = point.x < pageLeft + pageWidth / 2
    host.classList.toggle('is-mirrored-turn', mirrored)
    return start(point)
  }
  controller.getDirectionByPoint = () => 0
  controller.checkDirection = () => {
    const target = book.getCurrentPageIndex() + (mirrored ? -1 : 1)
    return target >= 0 && target < book.getPageCount()
  }
  const convertToPage = render.convertToPage.bind(render)
  render.convertToPage = (point, direction) => {
    if (mirrored) {
      const { left, pageWidth } = book.getBoundsRect()
      point = { x: 2 * (left + pageWidth) + pageWidth - point.x, y: point.y }
    }
    return convertToPage(point, direction)
  }

  collection.getFlippingPage = () => {
    const current = book.getPage(book.getCurrentPageIndex())
    const copy = current.newTemporaryCopy()
    copy.getElement().setAttribute('aria-hidden', 'true')
    copy.getElement().inert = true
    return copy
  }
  collection.getBottomPage = () => book.getPage(
    book.getCurrentPageIndex() + (mirrored ? -1 : 1)
  )
  // The forward animation calls this on completion; map to the real page order.
  book.turnToNextPage = () => book.turnToPage(
    book.getCurrentPageIndex() + (mirrored ? -1 : 1)
  )

  const fold = controller.fold.bind(controller)
  controller.fold = point => {
    // An impossible drag at the first/last page must not lock the controls.
    if (!controller.getCalculation() && !controller.start(point)) return
    fold(point)
  }
  const stopMove = controller.stopMove.bind(controller)
  controller.stopMove = () => {
    const calculation = controller.getCalculation()
    if (!calculation || controller.getState() !== 'user_fold') return stopMove()
    const position = calculation.getPosition()
    const { pageWidth, height } = book.getBoundsRect()
    const complete = (pageWidth - position.x) / pageWidth >= 0.3
    controller.animateFlippingTo(position, {
      x: complete ? -pageWidth : pageWidth,
      y: calculation.getCorner() === 'bottom' ? height : 0
    }, complete)
  }

  // Both physical corners should respond identically to hover and taps.
  controller.isPointOnCorners = point => {
    const { left, top, pageWidth, height } = book.getBoundsRect()
    const x = point.x - left - pageWidth
    const y = point.y - top
    const reach = Math.min(pageWidth * 0.25, Math.hypot(pageWidth, height) / 5)
    return x > 0 && x < pageWidth && y > 0 && y < height &&
      (x < reach || x > pageWidth - reach) && (y < reach || y > height - reach)
  }
}
