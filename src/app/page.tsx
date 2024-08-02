'use client'
import { useEffect, useState } from 'react'
import HoverCard from '@/components/effects/hover-card'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SmileIcon, ThumbsUpIcon, ThumbsDownIcon, FilterIcon, ListOrderedIcon } from 'lucide-react'
import { getFeedbackData, submitFeedbackAction } from '@/core/server/feedback'
import { opinionEmojis } from '@/core/config/config'
import { Feedback, FeedbackData } from '@/core/utils/types'

export default function FeedbackComponent() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({ feedbacks: [], emojiCounts: {} })
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    positive: true,
    negative: true,
    neutral: true,
  })
  const [sortBy, setSortBy] = useState('newest')

useEffect(() => {
    const fetchData = async () => {
      const data = await getFeedbackData()
      setFeedbackData(data)
      setFilteredFeedback(data.feedbacks)
    }
    fetchData()
  }, [])

  const totalFeedback = feedbackData.feedbacks.length
  const positiveFeedback =
    (feedbackData.emojiCounts['😍'] || 0) +
    (feedbackData.emojiCounts['🔥'] || 0)
  const negativeFeedback = 
    (feedbackData.emojiCounts['💩'] || 0) +
    (feedbackData.emojiCounts['🤮'] || 0)

  useEffect(() => {
    let result = feedbackData.feedbacks

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (feedback) =>
          feedback.opinion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.feedback?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply filters
    result = result.filter((feedback) => {
      if (feedback.opinion === '😍' || feedback.opinion === '🔥')
        return filters.positive
      if (feedback.opinion === '💩' || feedback.opinion === '🤮')
        return filters.negative
      return filters.neutral
    })

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
      case 'oldest':
        result.sort((a: { timestamp: string | number | Date }, b: { timestamp: string | number | Date }) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        break;
      default:
        break;
    }

    setFilteredFeedback(result)
  }, [searchTerm, filters, sortBy, feedbackData])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }))
  }

  const handleSortChange = (sortOption: string) => setSortBy(sortOption)

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <HoverCard>
          <Card className="!bg-[#E7E6E7] text-[#000101] p-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Total Feedback</h3>
              <p className="text-4xl font-bold">{totalFeedback}</p>
            </div>
            <SmileIcon className="w-12 h-12" />
          </Card>
        </HoverCard>
        <HoverCard>
          <Card className="!bg-[#202021] text-accent-foreground p-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Positive Feedback</h3>
              <p className="text-4xl font-bold">{positiveFeedback}</p>
            </div>
            <ThumbsUpIcon className="w-12 h-12" />
          </Card>
        </HoverCard>
        <HoverCard>
          <Card className="!bg-[#242428] text-secondary-foreground p-4 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Negative Feedback</h3>
              <p className="text-4xl font-bold">{negativeFeedback}</p>
            </div>
            <ThumbsDownIcon className="w-12 h-12" />
          </Card>
        </HoverCard>
      </div>
      
      <HoverCard>
        <Card className="border-[#3d3838] border shadow-sm shadow-white/10 bg-[#0B0A0B]">
          <CardHeader>
            <CardTitle className="text-text mb-2 ml-1">Feedback Logs</CardTitle>
            <div className="flex items-center align-bottom gap-2">
              <div className="flex flex-col gap-4">
                <Input
                  type="search"
                  placeholder="Search feedback..."
                  className="border-border border border-opacity-25 w-fit"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="actions"
                    className="border-border border border-opacity-25 w-fit"
                    size="sm"
                  >
                    <FilterIcon className="w-4 h-4" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.positive}
                    onCheckedChange={() => handleFilterChange('positive')}
                  >
                    Positive
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.negative}
                    onCheckedChange={() => handleFilterChange('negative')}
                  >
                    Negative
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.neutral}
                    onCheckedChange={() => handleFilterChange('neutral')}
                  >
                    Neutral
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="actions"
                    className="border-border border border-opacity-25 w-fit"
                    size="sm"
                  >
                    <ListOrderedIcon className="w-4 h-4" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleSortChange('newest')}>
                    Newest
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleSortChange('oldest')}>
                    Oldest
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Opinion</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedback.length > 0 ? (
                  filteredFeedback.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell className="font-medium">{feedback.id}</TableCell>
                      <TableCell>{feedback.opinion}</TableCell>
                      <TableCell>{feedback.feedback}</TableCell>
                      <TableCell>{new Date(feedback.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No feedback available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Showing {filteredFeedback.length} of {totalFeedback} feedback entries
          </CardFooter>
        </Card>
      </HoverCard>
    </div>
  )
}