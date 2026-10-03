import type { SquadParticipantProps } from '../squad-participant/props'

export interface SquadProps {
  id: string
  name: string
  characterId: string
  participants: SquadParticipantProps[]
  backgroundMediaId?: string
  source: string[]
}
