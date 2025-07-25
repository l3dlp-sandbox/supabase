import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui'
import { useFlag } from 'hooks/ui/useFlag'
import {
  getIntegrationTypeIcon,
  getIntegrationTypeLabel,
  INTEGRATION_TYPES,
} from './ThirdPartyAuthForm.utils'

interface AddIntegrationDropdownProps {
  buttonText?: string
  align?: 'end' | 'center'
  onSelectIntegrationType: (type: INTEGRATION_TYPES) => void
}

const ProviderDropdownItem = ({
  disabled,
  type,
  onSelectIntegrationType,
}: {
  disabled?: boolean
  type: INTEGRATION_TYPES
  onSelectIntegrationType: (type: INTEGRATION_TYPES) => void
}) => {
  return (
    <DropdownMenuItem
      key={type}
      onClick={() => onSelectIntegrationType(type)}
      className={cn('flex items-center gap-x-2 p-2', disabled && 'cursor-not-allowed')}
      disabled={disabled}
    >
      <Image src={getIntegrationTypeIcon(type)} width={16} height={16} alt={`${type} icon`} />
      <span>{getIntegrationTypeLabel(type)}</span>
    </DropdownMenuItem>
  )
}

export const AddIntegrationDropdown = ({
  align = 'end',
  onSelectIntegrationType,
}: AddIntegrationDropdownProps) => {
  const isWorkOSEnabled = useFlag('isWorkOSTPAEnabled')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="primary" iconRight={<ChevronDown size={14} strokeWidth={1} />}>
          Add provider
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel>Select Provider</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ProviderDropdownItem type="firebase" onSelectIntegrationType={onSelectIntegrationType} />
        <ProviderDropdownItem type="clerk" onSelectIntegrationType={onSelectIntegrationType} />
        {isWorkOSEnabled && (
          <ProviderDropdownItem type="workos" onSelectIntegrationType={onSelectIntegrationType} />
        )}
        <ProviderDropdownItem type="auth0" onSelectIntegrationType={onSelectIntegrationType} />
        <ProviderDropdownItem type="awsCognito" onSelectIntegrationType={onSelectIntegrationType} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
