export interface SquadParticipantProps {
  id: string
  label?: string
  text: string
  avatarMediaId?: string
  direction: 'incoming' | 'outgoing'
}
