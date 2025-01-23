import PoolUpdate from './pool-update'

interface PoolDetailItemProps {
  icon: React.ElementType
  children: React.ReactNode
  triggerTitle: string
  poolId: number
}

export default function PoolDetailItem({
  icon: Icon,
  children,
  triggerTitle,
  poolId,
}: PoolDetailItemProps) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="h-5 w-5" />
      {children ? (
        children
      ) : (
        <PoolUpdate triggerTitle={triggerTitle} poolId={poolId} />
      )}
    </div>
  )
}
