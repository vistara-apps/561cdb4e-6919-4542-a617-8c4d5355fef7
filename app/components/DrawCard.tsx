'use client'

import { Draw, PrizeItem } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Clock, Trophy, Users, DollarSign } from 'lucide-react'

interface DrawCardProps {
  draw: Draw
  prizeItems: PrizeItem[]
  onPurchaseTickets: (drawId: string, ticketCount: number) => void
}

export function DrawCard({ draw, prizeItems, onPurchaseTickets }: DrawCardProps) {
  const progressPercentage = (Number(draw.ticketsSold) / Number(draw.totalTickets)) * 100
  const timeLeft = new Date(draw.endTime).getTime() - Date.now()
  const hoursLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60)))
  const minutesLeft = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)))

  const getStatusColor = (status: Draw['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const ticketBundles = [
    { count: 1, price: 0.01, label: "1 Ticket" },
    { count: 5, price: 0.04, label: "5 Tickets" },
    { count: 25, price: 0.15, label: "25 Tickets" },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Draw #{draw.drawId}
            </CardTitle>
            <CardDescription className="mt-2">
              {prizeItems.length} amazing prizes up for grabs!
            </CardDescription>
          </div>
          <Badge className={getStatusColor(draw.status)}>
            {draw.status.charAt(0).toUpperCase() + draw.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Time and Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Time Left</p>
              <p className="text-sm text-muted-foreground">
                {hoursLeft}h {minutesLeft}m
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Tickets Sold</p>
              <p className="text-sm text-muted-foreground">
                {draw.ticketsSold} / {draw.totalTickets}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Prize Preview */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Featured Prizes
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {prizeItems.slice(0, 3).map((prize) => (
              <div key={prize.itemId} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="truncate">{prize.name}</span>
              </div>
            ))}
            {prizeItems.length > 3 && (
              <p className="text-sm text-muted-foreground">
                +{prizeItems.length - 3} more prizes
              </p>
            )}
          </div>
        </div>

        {/* Ticket Purchase Options */}
        {draw.status === 'active' && (
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Buy Tickets
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {ticketBundles.map((bundle) => (
                <Button
                  key={bundle.count}
                  onClick={() => onPurchaseTickets(draw.drawId, bundle.count)}
                  variant="outline"
                  className="justify-between h-auto p-3"
                >
                  <span>{bundle.label}</span>
                  <span className="font-mono">{bundle.price} ETH</span>
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              All transactions are secured by smart contracts
            </p>
          </div>
        )}

        {/* Completed Draw Info */}
        {draw.status === 'completed' && draw.winningTicketId && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium text-center">
              🎉 Draw Completed!
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Winning Ticket: #{draw.winningTicketId}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

