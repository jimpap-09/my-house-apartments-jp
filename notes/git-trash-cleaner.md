# Git Cleanup Strategy

## 1. Δες τι άλλαξε

```bash
git status
```

---

## 2. Κράτα μόνο ό,τι θέλεις

### είτε με add συγκεκριμένων files

```bash
git add src/file.js
```

### είτε interactive

```bash
git add -p
```

---

## 3. Κάνε commit τα σωστά

```bash
git commit -m "keep wanted changes"
```

---

## 4. Πέτα ό,τι απέμεινε

### untracked files

```bash
git clean -fd
```

### modified tracked files

```bash
git restore .
```

---

## 5. Αν θες μετά κάνεις squash commits

```bash
git rebase -i HEAD~2
```

και βάζεις:

```text
pick
squash
```