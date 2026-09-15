export const useBookmarks = () => {
  const bookmarkedIds = useState('bookmarkedIds', () => [])

  const loadBookmarks = () => {
    if (!import.meta.client) return
    bookmarkedIds.value = JSON.parse(localStorage.getItem('duaBookmarks') || '[]')
  }

  const isBookmarked = id => bookmarkedIds.value.includes(id)

  const toggleBookmark = id => {
    bookmarkedIds.value = isBookmarked(id)
      ? bookmarkedIds.value.filter(item => item !== id)
      : [...bookmarkedIds.value, id]
    if (import.meta.client) localStorage.setItem('duaBookmarks', JSON.stringify(bookmarkedIds.value))
  }

  return { bookmarkedIds, loadBookmarks, isBookmarked, toggleBookmark }
}
