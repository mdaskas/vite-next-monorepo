"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import { updateShippingTerm } from "../actions/shipping-term"
import type { IShippingTerm } from "../actions/types"

export function ShippingTermsTable({
  initialData,
}: {
  initialData: IShippingTerm[]
}) {
  const [terms, setTerms] = useState(initialData)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<{
    code: string
    description: string
  }>({ code: "", description: "" })
  const [saving, setSaving] = useState(false)

  function startEdit(term: IShippingTerm) {
    setEditingId(term.id)
    setEditValues({
      code: term.code,
      description: term.description,
    })
  }

  function cancelEdit() {
    setEditingId(null)
  }

  async function saveEdit(term: IShippingTerm) {
    setSaving(true)
    try {
      const updated = await updateShippingTerm(term.code, {
        code: editValues.code,
        description: editValues.description,
      })
      setTerms((prev) => prev.map((t) => (t.id === term.id ? updated : t)))
      setEditingId(null)
    } catch {
      alert("Failed to save shipping term")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {terms.map((term) =>
            editingId === term.id ? (
              <TableRow key={term.id}>
                <TableCell>
                  <Input
                    value={editValues.code}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, code: e.target.value }))
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={editValues.description}
                    onChange={(e) =>
                      setEditValues((v) => ({
                        ...v,
                        description: e.target.value,
                      }))
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => saveEdit(term)}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cancelEdit}
                      disabled={saving}
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={term.id}>
                <TableCell className="font-medium">{term.code}</TableCell>
                <TableCell>{term.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(term)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
          {terms.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground"
              >
                No shipping terms found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
